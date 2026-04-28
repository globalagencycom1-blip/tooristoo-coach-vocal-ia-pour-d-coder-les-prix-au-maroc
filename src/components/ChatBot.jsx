import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../lib/i18n';

const CHATBOT_RESPONSES = {
  fr: {
    greeting: 'Bonjour! Je suis l\'assistant NegoShield. Comment puis-je vous aider?',
    faq: 'Vous pouvez consulter notre FAQ pour plus de détails.',
    blog: 'Vous trouverez des guides utiles dans notre blog.',
    app: 'Voulez-vous essayer notre application IA?',
    pricing: 'Consultez nos tarifs pour voir les plans disponibles.',
    help: 'Je peux vous aider avec des questions sur les prix, les arnaques, ou vous guider dans l\'app.',
  },
  en: {
    greeting: 'Hello! I\'m the NegoShield assistant. How can I help you?',
    faq: 'You can check our FAQ for more details.',
    blog: 'You\'ll find helpful guides on our blog.',
    app: 'Would you like to try our AI application?',
    pricing: 'Check our pricing to see available plans.',
    help: 'I can help you with questions about prices, scams, or guide you through the app.',
  },
  es: {
    greeting: '¡Hola! Soy el asistente de NegoShield. ¿Cómo puedo ayudarte?',
    faq: 'Puedes consultar nuestras preguntas frecuentes para más detalles.',
    blog: 'Encontrarás guías útiles en nuestro blog.',
    app: '¿Te gustaría probar nuestra aplicación de IA?',
    pricing: 'Consulta nuestros precios para ver los planes disponibles.',
    help: 'Puedo ayudarte con preguntas sobre precios, estafas, o guiarte en la app.',
  },
  de: {
    greeting: 'Hallo! Ich bin der NegoShield-Assistent. Wie kann ich dir helfen?',
    faq: 'Sie können unsere FAQ für weitere Details konsultieren.',
    blog: 'Nützliche Leitfäden finden Sie in unserem Blog.',
    app: 'Möchten Sie unsere KI-Anwendung ausprobieren?',
    pricing: 'Sehen Sie sich unsere Preise an, um verfügbare Pläne zu sehen.',
    help: 'Ich kann dir bei Fragen zu Preisen, Betrügereien helfen oder dich durch die App führen.',
  },
  ar: {
    greeting: 'مرحبا! أنا مساعد NegoShield. كيف يمكنني مساعدتك؟',
    faq: 'يمكنك مراجعة الأسئلة الشائعة للمزيد من التفاصيل.',
    blog: 'ستجد أدلة مفيدة في مدونتنا.',
    app: 'هل تريد تجربة تطبيقنا الذي يعمل بالذكاء الاصطناعي؟',
    pricing: 'راجع أسعارنا لمعرفة الخطط المتاحة.',
    help: 'يمكنني مساعدتك في الأسئلة حول الأسعار والاحتيالات أو إرشادك في التطبيق.',
  },
  darija: {
    greeting: 'السلام! أنا الكوتش ديال NegoShield. واش كنقدم لك مساعدة؟',
    faq: 'تقدر تشوف الأسيلة الشائعة باش تعرف كتر.',
    blog: 'غادي تحصل على الأدلة المفيدة فالمدونة ديالنا.',
    app: 'واش بغيت تجرب التطبيق ديالنا؟',
    pricing: 'شوف الأثمان باش تعرف الفورمول الموجودة.',
    help: 'نقدر نعاونك بالأسيلة على الأثمان والحيل أو نرشدك فالتطبيق.',
  },
};

export default function ChatBot({ lang = 'fr' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: CHATBOT_RESPONSES[lang].greeting }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSmartResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Keywords mapping
    if (lowerMessage.includes('faq') || lowerMessage.includes('question') || lowerMessage.includes('aide')) {
      return CHATBOT_RESPONSES[lang].faq;
    }
    if (lowerMessage.includes('blog') || lowerMessage.includes('guide') || lowerMessage.includes('article')) {
      return CHATBOT_RESPONSES[lang].blog;
    }
    if (lowerMessage.includes('app') || lowerMessage.includes('analyser') || lowerMessage.includes('commencer')) {
      return CHATBOT_RESPONSES[lang].app;
    }
    if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('plan')) {
      return CHATBOT_RESPONSES[lang].pricing;
    }
    if (lowerMessage.includes('aider') || lowerMessage.includes('comment') || lowerMessage.includes('pouvoir')) {
      return CHATBOT_RESPONSES[lang].help;
    }

    // Use AI for general questions
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Tu es l'assistant NegoShield AI. L'utilisateur a écrit: "${userMessage}". 
Réponds en ${lang === 'fr' ? 'français' : lang === 'en' ? 'anglais' : lang === 'es' ? 'espagnol' : lang === 'de' ? 'allemand' : 'arabe'} (1-2 phrases max).
Si c'est une question sur les prix, les arnaques, ou l'app, aide l'utilisateur. Sinon, redirige poliment vers nos ressources.`,
      });
      return response;
    } catch {
      return CHATBOT_RESPONSES[lang].help;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
    setLoading(true);

    const response = await getSmartResponse(input);
    
    setLoading(false);
    setMessages(prev => [...prev, { type: 'bot', text: response }]);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-shield-green hover:bg-green-400 text-black rounded-full flex items-center justify-center shadow-lg transition-all btn-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-shield-card border border-shield-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-shield-green text-black p-4 flex items-center justify-between">
            <span className="font-bold">NegoShield Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-shield-green text-black'
                      : 'bg-shield-border text-gray-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-shield-border text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-shield-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Votre question..."
              className="flex-1 bg-shield-dark border border-shield-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-shield-green"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-shield-green hover:bg-green-400 text-black rounded-lg p-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}