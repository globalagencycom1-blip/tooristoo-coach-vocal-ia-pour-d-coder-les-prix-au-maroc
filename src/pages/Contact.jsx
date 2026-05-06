import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const { lang } = useLang();
  const t = useT(lang);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfos = [
    {
      icon: Mail,
      label: lang === 'fr' ? 'Email' : lang === 'en' ? 'Email' : lang === 'es' ? 'Correo' : lang === 'de' ? 'E-Mail' : lang === 'ar' ? 'البريد' : 'البريد',
      value: 'contact@tooristoo.com',
    },
  ];

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h1 className="font-poppins font-bold text-3xl text-white mb-2 text-center">{t('footer_contact')}</h1>
        <p className="text-gray-400 text-center mb-12">
          {lang === 'fr' ? 'Notre équipe est disponible pour répondre à vos questions.' : lang === 'en' ? 'Our team is available to answer your questions.' : lang === 'es' ? 'Nuestro equipo está disponible para responder sus preguntas.' : lang === 'de' ? 'Unser Team steht zur Verfügung, um Ihre Fragen zu beantworten.' : lang === 'ar' ? 'فريقنا متاح للإجابة على أسئلتك.' : 'الفريق ديالنا متوفر باش يجاوب على الأسيلة ديالك.'}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfos.map((info, i) => (
              <div key={i} className="bg-shield-card border border-shield-border rounded-xl p-4 flex items-start gap-3">
                <info.icon className="w-5 h-5 text-shield-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">{info.label}</p>
                  <p className="text-white text-sm mt-1">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={lang === 'fr' ? 'Votre nom' : lang === 'en' ? 'Your name' : lang === 'es' ? 'Su nombre' : lang === 'de' ? 'Ihr Name' : lang === 'ar' ? 'اسمك' : 'الإسم ديالك'}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
              required
            />
            <input
              type="email"
              placeholder={lang === 'fr' ? 'Votre email' : lang === 'en' ? 'Your email' : lang === 'es' ? 'Su correo' : lang === 'de' ? 'Ihre E-Mail' : lang === 'ar' ? 'بريدك' : 'البريد ديالك'}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
              required
            />
            <textarea
              placeholder={lang === 'fr' ? 'Votre message' : lang === 'en' ? 'Your message' : lang === 'es' ? 'Su mensaje' : lang === 'de' ? 'Ihre Nachricht' : lang === 'ar' ? 'رسالتك' : 'الرسالة ديالك'}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600 resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {lang === 'fr' ? 'Envoyer' : lang === 'en' ? 'Send' : lang === 'es' ? 'Enviar' : lang === 'de' ? 'Senden' : lang === 'ar' ? 'إرسال' : 'بعث'}
            </button>
            {submitted && (
              <div className="p-3 bg-shield-green/20 border border-shield-green/50 rounded-xl text-shield-green text-sm text-center">
                {lang === 'fr' ? 'Message envoyé! Merci de nous avoir contacté. Nous vous répondrons sous 48h' : lang === 'en' ? 'Message sent! Thank you for contacting us.' : lang === 'es' ? '¡Mensaje enviado! Gracias por contactarnos.' : lang === 'de' ? 'Nachricht gesendet! Danke, dass Sie uns kontaktieren.' : lang === 'ar' ? 'تم إرسال الرسالة! شكراً لتواصلك معنا.' : 'الرسالة تبعتت! شكراً على التواصل.'}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}