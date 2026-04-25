import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Shield } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function CTASection({ lang }) {
  const t = useT(lang);

  return (
    <section className="py-24 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)' }} />
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-shield-green/10 flex items-center justify-center">
          <Shield className="w-10 h-10 text-shield-green" />
        </div>
        <h2 className="font-poppins font-black text-4xl md:text-5xl text-white mb-6">
          {t('cta_title')}
        </h2>
        <p className="text-gray-400 text-xl mb-10">{t('cta_subtitle')}</p>
        <Link
          to="/app"
          className="inline-flex items-center gap-3 px-10 py-5 bg-shield-green text-black font-bold text-xl rounded-2xl hover:bg-green-400 transition-all btn-glow"
        >
          <Mic className="w-6 h-6" />
          {t('cta_btn')}
        </Link>
      </div>
    </section>
  );
}