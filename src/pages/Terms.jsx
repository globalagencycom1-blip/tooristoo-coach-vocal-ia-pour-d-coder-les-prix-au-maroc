import React from 'react';
import { Shield } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  const { lang } = useLang();
  const t = useT(lang);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-shield-green" />
          <h1 className="font-poppins font-bold text-3xl text-white">{t('footer_terms')}</h1>
        </div>

        <div className="bg-shield-card border border-shield-border rounded-2xl p-8 space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. {lang === 'fr' ? 'Acceptation des conditions' : lang === 'en' ? 'Acceptance of Terms' : lang === 'es' ? 'Aceptación de los términos' : lang === 'de' ? 'Bedingungen' : lang === 'ar' ? 'قبول الشروط' : 'قبول الشروط'}</h2>
            <p>{lang === 'fr' ? 'En utilisant Tooristoo, vous acceptez ces conditions d\'utilisation. Si vous n\'êtes pas d\'accord avec l\'une de ces conditions, veuillez ne pas utiliser l\'application.' : lang === 'en' ? 'By using Tooristoo, you accept these terms of use. If you do not agree with any of these terms, please do not use the application.' : lang === 'es' ? 'Al usar Tooristoo, acepta estos términos de uso. Si no está de acuerdo con alguno de estos términos, no use la aplicación.' : lang === 'de' ? 'Durch die Nutzung von Tooristoo akzeptieren Sie diese Nutzungsbedingungen. Wenn Sie diesen Bedingungen nicht zustimmen, verwenden Sie die Anwendung nicht.' : lang === 'ar' ? 'باستخدام Tooristoo، تقبل هذه الشروط. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام التطبيق.' : 'بالاستخدام ديال Tooristoo، تقبل الشروط ديال. إلا كنت ما توافقش على شي شرط، ما تستخدمش التطبيق.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. {lang === 'fr' ? 'Utilisation appropriée' : lang === 'en' ? 'Appropriate Use' : lang === 'es' ? 'Uso apropiado' : lang === 'de' ? 'Ordnungsgemäße Nutzung' : lang === 'ar' ? 'الاستخدام المناسب' : 'الاستخدام المناسب'}</h2>
            <p>{lang === 'fr' ? 'Vous acceptez d\'utiliser Tooristoo uniquement pour des fins légales et conformes à la loi française. Vous ne devez pas utiliser l\'application pour des activités illégales ou nuisibles.' : lang === 'en' ? 'You agree to use Tooristoo only for legal purposes and in compliance with French law. You must not use the application for illegal or harmful activities.' : lang === 'es' ? 'Usted acepta usar Tooristoo solo para fines legales y de conformidad con la ley francesa. No debe usar la aplicación para actividades ilegales o perjudiciales.' : lang === 'de' ? 'Sie erklären sich damit einverstanden, Tooristoo nur für legale Zwecke und in Übereinstimmung mit dem französischen Recht zu nutzen. Sie dürfen die Anwendung nicht für illegale oder schädliche Aktivitäten verwenden.' : lang === 'ar' ? 'توافق على استخدام Tooristoo فقط لأغراض قانونية وامتثالاً للقانون الفرنسي. يجب عدم استخدام التطبيق للأنشطة غير القانونية أو الضارة.' : 'توافق على استخدام Tooristoo غير قانوني وتحت التزام بالقانون الفرنسي. ما تستخدمش التطبيق لنشاطات غير قانونية.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. {lang === 'fr' ? 'Responsabilité' : lang === 'en' ? 'Liability' : lang === 'es' ? 'Responsabilidad' : lang === 'de' ? 'Haftung' : lang === 'ar' ? 'المسؤولية' : 'المسؤولية'}</h2>
            <p>{lang === 'fr' ? 'Tooristoo fournit des analyses et recommandations basées sur l\'intelligence artificielle. Nous ne garantissons pas que les recommandations seront toujours précises ou conduiront à un résultat spécifique.' : lang === 'en' ? 'Tooristoo provides analysis and recommendations based on artificial intelligence. We do not guarantee that the recommendations will always be accurate or lead to a specific outcome.' : lang === 'es' ? 'Tooristoo proporciona análisis y recomendaciones basadas en inteligencia artificial. No garantizamos que las recomendaciones siempre sean precisas o conduzcan a un resultado específico.' : lang === 'de' ? 'Tooristoo bietet Analysen und Empfehlungen auf Basis künstlicher Intelligenz. Wir garantieren nicht, dass die Empfehlungen immer genau sind oder zu einem bestimmten Ergebnis führen.' : lang === 'ar' ? 'يوفر Tooristoo تحليلات وتوصيات بناءً على الذكاء الاصطناعي. لا نضمن أن التوصيات ستكون دائماً دقيقة أو تؤدي إلى نتيجة معينة.' : 'يقدم Tooristoo تحليلات وتوصيات بناء على AI. ما تضمنش أن التوصيات كتكون دقيقة دايما.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. {lang === 'fr' ? 'Modification des conditions' : lang === 'en' ? 'Changes to Terms' : lang === 'es' ? 'Cambios en los términos' : lang === 'de' ? 'Änderungen der Bedingungen' : lang === 'ar' ? 'تعديلات الشروط' : 'تعديلات الشروط'}</h2>
            <p>{lang === 'fr' ? 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après leur publication. Votre utilisation continue de l\'application implique votre acceptation des modifications.' : lang === 'en' ? 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon publication. Your continued use of the application implies acceptance of the changes.' : lang === 'es' ? 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Su uso continuo de la aplicación implica la aceptación de los cambios.' : lang === 'de' ? 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden sofort nach ihrer Veröffentlichung wirksam. Ihre weitere Nutzung der Anwendung impliziert die Akzeptanz der Änderungen.' : lang === 'ar' ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التعديلات سارية المفعول فوراً بعد نشرها. يشير استخدامك المستمر للتطبيق إلى قبول التعديلات.' : 'نحتفظ الحق نبدلو الشروط فأي وقت. التعديلات تكون نافذة على طول. الاستخدام ديالك ديال التطبيق يعني قبولك لتعديلات.'}</p>
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