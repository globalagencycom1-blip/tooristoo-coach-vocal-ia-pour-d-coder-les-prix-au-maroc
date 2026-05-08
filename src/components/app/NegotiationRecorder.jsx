import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Loader2, Copy, Send, AlertCircle, Check, RotateCcw } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { getRecorderT } from '../../lib/recorder-translations';
import { analyzeNegotiation } from '../../lib/pricing-knowledge-base';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

const SPEECH_LANG_MAP = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  ar: 'ar-SA',
  darija: 'ar-MA',
};

const MAX_TRANSCRIPT_CHARS = 2000;

export default function NegotiationRecorder({ category, location, onAnalysisComplete, lang }) {
  const t = useT(lang);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = SPEECH_LANG_MAP[lang] || SPEECH_LANG_MAP.fr;

    recognition.onstart = () => {
      if (!isMountedRef.current) return;
      setIsRecording(true);
      setError(null);
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      if (!isMountedRef.current) return;
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const part = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += part + ' ';
        } else {
          interimTranscript += part;
        }
      }

      const last = event.results[event.results.length - 1];
      if (last && last[0]) {
        setConfidence(last[0].confidence || 0);
      }

      const combined = finalTranscriptRef.current + interimTranscript;
      setTranscript(combined.slice(0, MAX_TRANSCRIPT_CHARS));
    };

    recognition.onerror = (event) => {
      if (!isMountedRef.current) return;
      console.error('Speech recognition error', event.error);
      setIsRecording(false);

      const errorMessages = {
        'not-allowed': getRecorderT('error_microphone_denied', lang),
        'no-speech': getRecorderT('error_no_speech', lang),
        'audio-capture': getRecorderT('error_audio_capture', lang),
        'network': getRecorderT('error_network', lang),
        'aborted': null,
      };

      const message = errorMessages[event.error];
      if (message) setError(message);
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        }
      } catch (e) {
        // ignorer
      }
    };
  }, [lang]);

  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Error stopping recognition', e);
      }
      setIsRecording(false);
    } else {
      finalTranscriptRef.current = '';
      setTranscript('');
      setConfidence(0);
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Error starting recognition', e);
        setError(getRecorderT('error_start_failed', lang));
      }
    }
  }, [isRecording, lang]);

  const copyTranscript = useCallback(async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => {
        if (isMountedRef.current) setCopied(false);
      }, 2000);
    } catch (e) {
      console.warn('Clipboard error', e);
      setError(getRecorderT('error_clipboard', lang));
    }
  }, [transcript, lang]);

  const clearTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    const cleanTranscript = transcript.trim();
    if (!cleanTranscript) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeNegotiation({
        category,
        city: location,
        transcript: cleanTranscript,
        lang,
      });

      if (!isMountedRef.current) return;

      onAnalysisComplete({
        ...result,
        transcript: finalTranscriptRef.current.trim(),
        timestamp: new Date().toISOString(),
      });

      finalTranscriptRef.current = '';
      setTranscript('');
      setConfidence(0);
    } catch (err) {
      console.error('Analysis error:', err);
      if (isMountedRef.current) {
        setError(getRecorderT('error_analysis_failed', lang));
      }
    } finally {
      if (isMountedRef.current) {
        setIsAnalyzing(false);
      }
    }
  }, [transcript, category, location, lang, onAnalysisComplete]);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-950/30 border border-yellow-500/30 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-400 text-sm font-semibold mb-1">
            {getRecorderT('browser_not_supported_title', lang)}
          </p>
          <p className="text-yellow-400/80 text-xs leading-relaxed">
            {getRecorderT('browser_not_supported_desc', lang)}
          </p>
        </div>
      </div>
    );
  }

  const charsRemaining = MAX_TRANSCRIPT_CHARS - transcript.length;
  const showCharsWarning = charsRemaining < 200;

  return (
    <div
      className="space-y-4 p-4 bg-shield-card border border-shield-border rounded-2xl"
      role="region"
      aria-label={getRecorderT('recorder_tab', lang)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-shield-green" aria-hidden="true" />
          {getRecorderT('recorder_tab', lang)}
        </h3>
        <div className="flex items-center gap-2" aria-live="polite">
          {isRecording && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-red-400">
                {getRecorderT('recording_on', lang)}
              </span>
            </span>
          )}
          {!isRecording && (
            <span className="text-xs font-semibold text-gray-400">
              {getRecorderT('recording_off', lang)}
            </span>
          )}
          {confidence > 0 && !isRecording && (
            <span className="text-xs text-gray-500">
              {Math.round(confidence * 100)}% {getRecorderT('confidence_label', lang)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={toggleRecording}
        disabled={isAnalyzing}
        aria-pressed={isRecording}
        aria-label={isRecording ? getRecorderT('stop_recording', lang) : getRecorderT('start_recording', lang)}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
            : 'bg-shield-green hover:bg-green-400 text-black'
        }`}
      >
        {isRecording ? (
          <>
            <MicOff className="w-5 h-5" aria-hidden="true" />
            {getRecorderT('stop_recording', lang)}
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" aria-hidden="true" />
            {getRecorderT('start_recording', lang)}
          </>
        )}
      </button>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 bg-red-950/30 border border-red-500/30 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-red-400 leading-relaxed">{error}</p>
        </div>
      )}

      {transcript && (
        <div className="space-y-2">
          <div className="relative">
            <div
              className="bg-shield-dark border border-shield-border rounded-lg p-3 min-h-24 max-h-40 overflow-y-auto"
              dir={lang === 'ar' || lang === 'darija' ? 'rtl' : 'ltr'}
            >
              <p className="text-sm text-gray-300 leading-relaxed pr-10">{transcript}</p>
            </div>
            <button
              onClick={copyTranscript}
              className="absolute top-2 right-2 p-2 bg-shield-border hover:bg-shield-border/80 rounded-lg transition-all"
              title={copied ? getRecorderT('copied', lang) : getRecorderT('copy', lang)}
              aria-label={copied ? getRecorderT('copied', lang) : getRecorderT('copy', lang)}
            >
              {copied ? (
                <Check className="w-4 h-4 text-shield-green" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" aria-hidden="true" />
              )}
            </button>
          </div>

          {showCharsWarning && (
            <p className="text-xs text-yellow-500/80">
              {getRecorderT('chars_warning', lang)}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={clearTranscript}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-shield-border hover:bg-shield-border/80 disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-all"
              aria-label={getRecorderT('clear_transcript', lang)}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {getRecorderT('clear_transcript', lang)}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !transcript.trim() || isRecording}
              className="flex-1 px-3 py-2 bg-shield-green hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  {t('analyzing')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {t('analyze_btn')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        {isRecording
          ? getRecorderT('record_help_text', lang)
          : getRecorderT('record_help_text_idle', lang)}
      </p>
    </div>
  );
}