import React from 'react';
import { Shield } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const t = useT(lang);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-shield-green" />
          <h1 className="font-poppins font-bold text-3xl text-white">{t('footer_privacy')}</h1>
        </div>

        <div className="bg-shield-card border border-shield-border rounded-2xl p-8 space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. {lang === 'fr' ? 'Informations collectées' : lang === 'en' ? 'Information We Collect' : lang === 'es' ? 'Información que recopilamos' : lang === 'de' ? 'Informationen, die wir sammeln' : lang === 'ar' ? 'المعلومات التي نجمعها' : 'المعلومات لي نجمعوها'}</h2>
            <p>{lang === 'fr' ? 'Nous collectons les informations que vous nous fournissez directement, notamment votre adresse email, votre nom complet, votre langue préférée et vos données de négociation touristique.' : lang === 'en' ? 'We collect information you provide directly, including your email address, full name, preferred language, and tourism negotiation data.' : lang === 'es' ? 'Recopilamos información que usted proporciona directamente, incluida su dirección de correo electrónico, nombre completo, idioma preferido y datos de negociación turística.' : lang === 'de' ? 'Wir sammeln Informationen, die Sie direkt bereitstellen, einschließlich Ihrer E-Mail-Adresse, vollständigen Namen, bevorzugten Sprache und Verhandlungsdaten für Touristen.' : lang === 'ar' ? 'نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك عنوان بريدك الإلكتروني واسمك الكامل واللغة المفضلة لديك وبيانات المفاوضات السياحية.' : 'نجمعو المعلومات لي نتيك لينا مباشرة، فيهم البريد الإلكتروني ديالك والإسم الكامل والغة المفضلة وبيانات الفاوضات السياحية.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. {lang === 'fr' ? 'Utilisation des données' : lang === 'en' ? 'Data Usage' : lang === 'es' ? 'Uso de datos' : lang === 'de' ? 'Datennutzung' : lang === 'ar' ? 'استخدام البيانات' : 'استخدام البيانات'}</h2>
            <p>{lang === 'fr' ? 'Vos données sont utilisées pour améliorer l\'application, analyser les tendances des prix touristiques, et vous fournir des recommandations personnalisées. Vos informations ne sont jamais vendues à des tiers.' : lang === 'en' ? 'Your data is used to improve the application, analyze tourism price trends, and provide personalized recommendations. Your information is never sold to third parties.' : lang === 'es' ? 'Sus datos se utilizan para mejorar la aplicación, analizar tendencias de precios turísticos y proporcionar recomendaciones personalizadas. Su información nunca se vende a terceros.' : lang === 'de' ? 'Ihre Daten werden verwendet, um die Anwendung zu verbessern, Tourismuspreise zu analysieren und personalisierte Empfehlungen zu geben. Ihre Informationen werden niemals an Dritte verkauft.' : lang === 'ar' ? 'يتم استخدام بيانات لتحسين التطبيق وتحليل اتجاهات أسعار السياحة وتقديم توصيات مخصصة. لن يتم بيع معلوماتك لأطراف ثالثة.' : 'نستخدمو البيانات ديالك باش نحسنو التطبيق ونحللو الأسعار السياحية ونتيك توصيات مخصصة. البيانات ديالك ما كتتباع لحتى طرف تالت.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. {lang === 'fr' ? 'Sécurité des données' : lang === 'en' ? 'Data Security' : lang === 'es' ? 'Seguridad de datos' : lang === 'de' ? 'Datensicherheit' : lang === 'ar' ? 'أمان البيانات' : 'أمان البيانات'}</h2>
            <p>{lang === 'fr' ? 'Toutes vos données sont chiffrées en transit et au repos. Nous utilisons les protocoles de sécurité les plus avancés pour protéger vos informations personnelles.' : lang === 'en' ? 'All your data is encrypted in transit and at rest. We use the most advanced security protocols to protect your personal information.' : lang === 'es' ? 'Todos sus datos están encriptados en tránsito y en reposo. Utilizamos los protocolos de seguridad más avanzados para proteger su información personal.' : lang === 'de' ? 'Alle Ihre Daten sind im Transit und in Ruhe verschlüsselt. Wir verwenden die fortschrittlichsten Sicherheitsprotokolle, um Ihre persönlichen Informationen zu schützen.' : lang === 'ar' ? 'جميع بيانات مشفرة أثناء النقل وفي الراحة. نستخدم بروتوكولات الأمان الأكثر تقدماً لحماية معلوماتك الشخصية.' : 'جميع البيانات ديالك مشفرة. نستخدمو أحسن بروتوكولات الأمان باش نحميو المعلومات ديالك.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. {lang === 'fr' ? 'Vos droits' : lang === 'en' ? 'Your Rights' : lang === 'es' ? 'Sus derechos' : lang === 'de' ? 'Ihre Rechte' : lang === 'ar' ? 'حقوقك' : 'الحقوق ديالك'}</h2>
            <p>{lang === 'fr' ? 'Vous avez le droit d\'accéder, modifier ou supprimer vos données personnelles à tout moment en contactant notre équipe support.' : lang === 'en' ? 'You have the right to access, modify, or delete your personal data at any time by contacting our support team.' : lang === 'es' ? 'Tiene derecho a acceder, modificar o eliminar sus datos personales en cualquier momento contactando a nuestro equipo de soporte.' : lang === 'de' ? 'Sie haben das Recht, Ihre persönlichen Daten jederzeit einzusehen, zu ändern oder zu löschen, indem Sie unser Support-Team kontaktieren.' : lang === 'ar' ? 'لديك الحق في الوصول إلى بيانات الشخصية أو تعديلها أو حذفها في أي وقت عن طريق الاتصال بفريق الدعم لدينا.' : 'كاين الحق ديالك تدخل، تبدل أو تحذف البيانات ديالك فأي وقت عبر تواصلك مع الفريق ديال الدعم.'}</p>
          </section>

          <div className="border-t border-shield-border pt-6 mt-6">
            <p className="text-xs text-gray-500">{lang === 'fr' ? 'Dernière mise à jour: Avril 2026' : lang === 'en' ? 'Last updated: April 2026' : lang === 'es' ? 'Última actualización: Abril 2026' : lang === 'de' ? 'Zuletzt aktualisiert: April 2026' : lang === 'ar' ? 'آخر تحديث: أبريل 2026' : 'آخر تحديث: أبريل 2026'}</p>
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}