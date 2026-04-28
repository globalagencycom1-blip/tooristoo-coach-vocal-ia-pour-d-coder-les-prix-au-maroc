import React from 'react';
import { Shield, Building2, FileText, Lock, Scale, Contact2 } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { getLegalNoticeT } from '../lib/legal-notice-translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LegalNotice() {
  const { lang } = useLang();
  const t = (key) => getLegalNoticeT(key, lang);

  const sections = [
    {
      icon: Building2,
      titleKey: 'legal_company_info',
      contentKey: 'legal_company_content'
    },
    {
      icon: FileText,
      titleKey: 'legal_conditions',
      contentKey: 'legal_conditions_content'
    },
    {
      icon: Lock,
      titleKey: 'legal_data_protection',
      contentKey: 'legal_data_protection_content'
    },
    {
      icon: Scale,
      titleKey: 'legal_liability',
      contentKey: 'legal_liability_content'
    },
    {
      icon: Contact2,
      titleKey: 'legal_contact',
      contentKey: 'legal_contact_content'
    }
  ];

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            {t('legal_badge')}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {t('legal_title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('legal_subtitle')}</p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-6 mb-12">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="bg-shield-card border border-shield-border rounded-2xl p-8 hover:border-shield-green/50 transition-all"
              >
                <div className="flex gap-4 mb-4">
                  <Icon className="w-6 h-6 text-shield-green flex-shrink-0 mt-1" />
                  <h2 className="font-poppins font-bold text-2xl text-white">
                    {t(section.titleKey)}
                  </h2>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-3 ml-10">
                  {t(section.contentKey)
                    .split('\n\n')
                    .map((paragraph, pidx) => (
                      <p key={pidx}>{paragraph}</p>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-shield-card border border-shield-border rounded-2xl p-8">
          <h3 className="font-poppins font-bold text-xl text-white mb-4">{t('legal_important')}</h3>
          <ul className="text-gray-300 text-sm space-y-2 ml-4">
            {t('legal_important_list')
              .split('\n')
              .map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-shield-green">•</span>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-shield-border">
          <p className="text-gray-500 text-xs mb-2">{t('legal_updated')}</p>
          <p className="text-gray-600 text-sm">{t('legal_footer_text')}</p>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}