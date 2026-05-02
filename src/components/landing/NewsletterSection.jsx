import React, { useState } from 'react';
import { Mail, Shield, Zap, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const NL = {
  fr: {
    badge: '📬 Newsletter Tooristoo',
    title: 'Voyagez plus malin,',
    title2: 'restez toujours protégé',
    subtitle: 'Recevez chaque semaine les alertes abus de prix, prix réels du marché et conseils exclusifs de négociation directement dans votre boîte mail.',
    perks: [
      '🚨 Alertes abus de prix en temps réel',
      '💰 Prix du marché mis à jour chaque semaine',
      '🧠 Phrases de négociation exclusives',
      '🇲🇦 Conseils de locaux et d\'experts',
    ],
    placeholder: 'Votre adresse email',
    cta: 'Je veux mes alertes gratuites',
    loading: 'Inscription en cours...',
    success_title: 'Bienvenue dans la communauté ! 🎉',
    success_msg: 'Vous recevrez votre première alerte très bientôt. Vérifiez vos spams si besoin.',
    privacy: 'Pas de spam. Désinscription en 1 clic. Vos données sont sécurisées.',
    count: '+12 400 voyageurs abonnés',
  },
  en: {
    badge: '📬 Tooristoo Newsletter',
    title: 'Travel smarter,',
    title2: 'stay always protected',
    subtitle: 'Get weekly price abuse alerts, real market prices and exclusive negotiation tips delivered straight to your inbox.',
    perks: [
      '🚨 Real-time price abuse alerts',
      '💰 Market prices updated weekly',
      '🧠 Exclusive negotiation phrases',
      '🇲🇦 Tips from locals and experts',
    ],
    placeholder: 'Your email address',
    cta: 'Get my free alerts',
    loading: 'Subscribing...',
    success_title: 'Welcome to the community! 🎉',
    success_msg: 'You\'ll receive your first alert very soon. Check your spam folder if needed.',
    privacy: 'No spam. Unsubscribe in 1 click. Your data is secure.',
    count: '+12,400 travelers subscribed',
  },
  es: {
    badge: '📬 Newsletter Tooristoo',
    title: 'Viaja más inteligente,',
    title2: 'mantente siempre protegido',
    subtitle: 'Recibe cada semana alertas de abusos de precio, precios reales del mercado y consejos exclusivos de negociación directamente en tu bandeja de entrada.',
    perks: [
      '🚨 Alertas de abusos de precio en tiempo real',
      '💰 Precios de mercado actualizados semanalmente',
      '🧠 Frases de negociación exclusivas',
      '🇲🇦 Consejos de locales y expertos',
    ],
    placeholder: 'Tu dirección de email',
    cta: 'Quiero mis alertas gratuitas',
    loading: 'Suscribiendo...',
    success_title: '¡Bienvenido a la comunidad! 🎉',
    success_msg: 'Recibirás tu primera alerta muy pronto. Revisa tu carpeta de spam si es necesario.',
    privacy: 'Sin spam. Cancelación en 1 clic. Tus datos están seguros.',
    count: '+12.400 viajeros suscritos',
  },
  de: {
    badge: '📬 Tooristoo Newsletter',
    title: 'Reisen Sie klüger,',
    title2: 'bleiben Sie immer geschützt',
    subtitle: 'Erhalten Sie wöchentlich Benachrichtigungen über Preismissbrauch, aktuelle Marktpreise und exklusive Verhandlungstipps direkt in Ihr Postfach.',
    perks: [
      '🚨 Echtzeit-Benachrichtigungen für Preismissbrauch',
      '💰 Wöchentlich aktualisierte Marktpreise',
      '🧠 Exklusive Verhandlungsphrasen',
      '🇲🇦 Tipps von Einheimischen und Experten',
    ],
    placeholder: 'Ihre E-Mail-Adresse',
    cta: 'Meine kostenlosen Warnungen',
    loading: 'Anmeldung läuft...',
    success_title: 'Willkommen in der Community! 🎉',
    success_msg: 'Sie erhalten Ihren ersten Alert sehr bald. Prüfen Sie ggf. den Spam-Ordner.',
    privacy: 'Kein Spam. Abmeldung mit 1 Klick. Ihre Daten sind sicher.',
    count: '+12.400 Reisende abonniert',
  },
  ar: {
    badge: '📬 نشرة Tooristoo',
    title: 'سافر بذكاء أكثر،',
    title2: 'ابقَ محمياً دائماً',
    subtitle: 'احصل أسبوعياً على تنبيهات إساءة استخدام الأسعار وأسعار السوق الحقيقية ونصائح التفاوض الحصرية مباشرة في بريدك.',
    perks: [
      '🚨 تنبيهات إساءة استخدام الأسعار الفورية',
      '💰 أسعار السوق محدثة أسبوعياً',
      '🧠 عبارات تفاوض حصرية',
      '🇲🇦 نصائح من المحليين والخبراء',
    ],
    placeholder: 'عنوان بريدك الإلكتروني',
    cta: 'أريد تنبيهاتي المجانية',
    loading: 'جاري التسجيل...',
    success_title: 'مرحباً في المجتمع! 🎉',
    success_msg: 'ستتلقى أول تنبيه قريباً جداً. تحقق من مجلد الرسائل غير المرغوب فيها إذا لزم الأمر.',
    privacy: 'لا رسائل مزعجة. إلغاء الاشتراك بنقرة واحدة. بياناتك آمنة.',
    count: '+12,400 مسافر مشترك',
  },
  darija: {
    badge: '📬 نيوزليتر Tooristoo',
    title: 'سافر بذكاء أكثر،',
    title2: 'بقا محمي دايما',
    subtitle: 'احصل كل أسبوع على تنبيهات الأثمان الغالية والأثمان الحقيقية ونصايح التفاوض الحصرية مباشرة فإيميلك.',
    perks: [
      '🚨 تنبيهات الأثمان الغالية فوراً',
      '💰 أثمان السوق محدثة كل أسبوع',
      '🧠 جمل تفاوض حصرية',
      '🇲🇦 نصايح من الموالين والخبراء',
    ],
    placeholder: 'عنوان الإيميل ديالك',
    cta: 'حب التنبيهات المجانية ديالي',
    loading: 'كيتسجل...',
    success_title: 'مرحبا فالمجتمع! 🎉',
    success_msg: 'غادي تقبل أول تنبيه قريب بزاف. كورفيري صندوق السبام إلا خاصك.',
    privacy: 'بلا سبام. إلغاء الاشتراك بضغطة واحدة. البيانات ديالك آمنة.',
    count: '+12,400 مسافر مشتركين',
  },
};

export default function NewsletterSection({ lang }) {
  const l = NL[lang] || NL.fr;
  const isRTL = lang === 'ar' || lang === 'darija';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(lang === 'ar' || lang === 'darija' ? 'أدخل بريداً إلكترونياً صحيحاً' : 'Veuillez entrer un email valide');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: lang === 'fr' ? 'Bienvenue à la newsletter Tooristoo ✨' : lang === 'es' ? 'Bienvenido a la newsletter Tooristoo ✨' : lang === 'de' ? 'Willkommen zum Tooristoo Newsletter ✨' : lang === 'ar' ? 'أهلاً بك في نشرة Tooristoo ✨' : lang === 'darija' ? 'أهلاً بيك ف نيوزليتر Tooristoo ✨' : 'Welcome to Tooristoo Newsletter ✨',
        body: lang === 'fr' ? `Merci de vous être abonné à Tooristoo Alert!\n\nVous recevrez chaque semaine:\n• Alertes abus de prix en temps réel\n• Prix du marché mis à jour\n• Phrases de négociation exclusives\n• Conseils de locaux\n\nBonne chance pour vos négociations! 🇲🇦` : 'Thank you for subscribing to Tooristoo Alert!\n\nYou will receive weekly:\n• Real-time price abuse alerts\n• Updated market prices\n• Exclusive negotiation phrases\n• Local tips',
      });
      setEmail('');
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Newsletter error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-shield-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-shield-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shield-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-shield-card via-[#0f2035] to-shield-card border border-shield-green/20 rounded-3xl p-8 md:p-12 card-glow">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left: Copy */}
            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-xs font-bold mb-5 tracking-wide">
                <Mail className="w-3.5 h-3.5" />
                {l.badge}
              </div>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-white leading-tight mb-2">
                {l.title}
              </h2>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-gradient-green leading-tight mb-5">
                {l.title2}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{l.subtitle}</p>

              {/* Perks */}
              <ul className="space-y-2.5 mb-6">
                {l.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-shield-green flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Social proof */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🧑‍🦰','👩‍🦱','🧔','👩'].map((emoji, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-shield-border border-2 border-shield-dark flex items-center justify-center text-xs">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">{l.count}</span>
              </div>
            </div>

            {/* Right: Form */}
            <div dir={isRTL ? 'rtl' : 'ltr'}>
              {success ? (
                <div className="bg-shield-green/10 border border-shield-green/40 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-shield-green/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-shield-green" />
                  </div>
                  <h3 className="text-white font-poppins font-bold text-xl mb-2">{l.success_title}</h3>
                  <p className="text-gray-400 text-sm">{l.success_msg}</p>
                </div>
              ) : (
                <div className="bg-shield-dark/60 border border-shield-border rounded-2xl p-6">
                  {/* Shield icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-shield-green/10 border border-shield-green/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-shield-green" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Tooristoo Alert</p>
                      <p className="text-gray-500 text-xs">Weekly · Free · Trusted</p>
                    </div>
                  </div>

                  {/* Mock email preview */}
                  <div className="bg-shield-card border border-shield-border rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-shield-gold" />
                      <div className="w-2 h-2 rounded-full bg-shield-green" />
                      <span className="text-xs text-gray-600 ml-2">tooristoo.com · Alerte Semaine</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs">🚨</span>
                        <div className="flex-1 h-2 bg-shield-border rounded animate-pulse" />
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs">💰</span>
                        <div className="flex-1 h-2 bg-shield-border rounded w-3/4" />
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs">🧠</span>
                        <div className="flex-1 h-2 bg-shield-border/70 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none`} />
                      <input
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(''); }}
                        placeholder={l.placeholder}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full bg-shield-card border border-shield-border text-white rounded-xl ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600 transition-colors`}
                      />
                    </div>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />{l.loading}</>
                      ) : (
                        <><Zap className="w-4 h-4" />{l.cta}<ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-600">{l.privacy}</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}