import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, Play, Copy, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';

export default function NegotiationRecorder({ category, location, onAnalysisComplete, lang }) {
  const t = useT(lang);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : lang === 'ar' ? 'ar-SA' : 'fr-FR';

    recognition.onstart = () => {
      setIsRecording(true);
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      setConfidence(event.results[event.results.length - 1][0].confidence);
      setTranscript(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lang]);

  const toggleRecording = () => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      } else {
        finalTranscriptRef.current = '';
        setTranscript('');
        recognitionRef.current.start();
      }
    }
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;

    setIsAnalyzing(true);
    try {
      const prompt = `Tu es NegoShield AI, expert en prix touristiques au Maroc.

SITUATION ACTUELLE:
- Catégorie: ${category}
- Ville: ${location}
- Transcription de la conversation: "${transcript}"

Extrais les informations suivantes de cette conversation:
1. Le prix demandé par le vendeur
2. Les détails du service/produit
3. Identifie tout signe d'arnaque potentiel
4. Fournir une analyse et des recommandations

Réponds en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : 'Français'}.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            price_asked: { type: 'number' },
            price_estimated_min: { type: 'number' },
            price_estimated_max: { type: 'number' },
            risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
            scam_detected: { type: 'boolean' },
            ai_analysis: { type: 'string' },
            recommended_phrase: { type: 'string' },
            strategy: { type: 'string' },
          }
        }
      });

      onAnalysisComplete({
        ...result,
        category,
        location,
        transcript: finalTranscriptRef.current.trim(),
      });

      // Reset after successful analysis
      finalTranscriptRef.current = '';
      setTranscript('');
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return (
      <div className="p-4 bg-yellow-950/30 border border-yellow-500/30 rounded-2xl text-yellow-400 text-xs">
        Votre navigateur ne supporte pas l'API Web Speech. Utilisez Chrome, Edge ou Safari.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-shield-card border border-shield-border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-shield-green" />
          Enregistrer la négociation
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isRecording ? 'text-red-400' : 'text-gray-400'}`}>
            {isRecording ? '🔴 En cours' : 'Arrêté'}
          </span>
          {confidence > 0 && (
            <span className="text-xs text-gray-500">
              {Math.round(confidence * 100)}% confiance
            </span>
          )}
        </div>
      </div>

      {/* Recording Button */}
      <button
        onClick={toggleRecording}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-shield-green hover:bg-green-400 text-black'
        }`}
      >
        {isRecording ? (
          <>
            <MicOff className="w-5 h-5" />
            Arrêter l'enregistrement
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            Démarrer l'enregistrement
          </>
        )}
      </button>

      {/* Transcript Display */}
      {transcript && (
        <div className="space-y-2">
          <div className="relative">
            <div className="bg-shield-dark border border-shield-border rounded-lg p-3 min-h-24 max-h-40 overflow-y-auto">
              <p className="text-sm text-gray-300 leading-relaxed">{transcript}</p>
            </div>
            <button
              onClick={copyTranscript}
              className="absolute top-2 right-2 p-2 bg-shield-border hover:bg-shield-border/80 rounded-lg transition-all"
              title="Copier"
            >
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                finalTranscriptRef.current = '';
                setTranscript('');
              }}
              className="flex-1 px-3 py-2 bg-shield-border hover:bg-shield-border/80 text-gray-300 text-sm font-semibold rounded-lg transition-all"
            >
              Effacer
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !transcript.trim()}
              className="flex-1 px-3 py-2 bg-shield-green hover:bg-green-400 disabled:opacity-50 text-black text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyse...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyser
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Info Text */}
      <p className="text-xs text-gray-500 text-center">
        {isRecording
          ? 'Parlez naturellement avec le vendeur. La transcription se fait en temps réel.'
          : 'Appuyez sur le bouton pour commencer à enregistrer votre conversation.'}
      </p>
    </div>
  );
}