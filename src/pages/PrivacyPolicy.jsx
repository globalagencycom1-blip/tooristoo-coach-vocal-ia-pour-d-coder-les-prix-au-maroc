import React from 'react';
import { Shield, Mic, Database, Eye, Lock, Globe, Mail, Cookie, UserCheck, AlertTriangle, Phone } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { getPrivacyT } from '../lib/privacy-translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ICONS = [UserCheck, Database, Mic, Globe, Lock, Eye, UserCheck, Cookie, AlertTriangle, Phone];

const renderContent = (content) => {
  return content.split('\n\n').map((block, i) => (
    <div key={i} className="mb-3">
      {block.split('\n').map((line, j) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={j} className="font-semibold text-white mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
        }
        if (line.startsWith('• ')) {
          return <div key={j} className="flex gap-2 ml-2 mb-1"><span className="text-shield-green flex-shrink-0">•</span><span>{formatInline(line.slice(2))}</span></div>;
        }
        if (line.trim() === '') return null;
        return <p key={j}>{formatInline(line)}</p>;
      })}
    </div>
  ));
};

const formatInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
      : part
  );
};

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const data = getPrivacyT(lang);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            {data.badge}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">{data.title}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        {/* RGPD Banner */}
        <div className="bg-shield-green/10 border border-shield-green/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <Shield className="w-8 h-8 text-shield-green flex-shrink-0 mt-1" />
          <div>
            <p className="text-shield-green font-semibold mb-1">{data.rgpd_banner_title}</p>
            <p className="text-gray-400 text-sm">{data.rgpd_banner_desc}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {data.sections.map((section, idx) => {
            const Icon = ICONS[idx] || Shield;
            return (
              <div key={idx} className="bg-shield-card border border-shield-border rounded-2xl p-8 hover:border-shield-green/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-shield-green/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-shield-green" />
                  </div>
                  <h2 className="font-poppins font-bold text-xl text-white pt-1">{section.title}</h2>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed ml-14">
                  {renderContent(section.content)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-shield-border">
          <p className="text-gray-500 text-xs">{data.footer_updated}</p>
          <p className="text-gray-600 text-sm mt-2">
            {data.footer_rights} <a href="mailto:contact@tooristoo.com" className="text-shield-green hover:underline">contact@tooristoo.com</a>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {data.footer_authority} <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-shield-green hover:underline">CNIL — www.cnil.fr</a>
          </p>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}