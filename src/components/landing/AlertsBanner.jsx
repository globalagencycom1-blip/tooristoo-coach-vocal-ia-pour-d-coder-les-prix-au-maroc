import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';
import { useT } from '../../lib/i18n';

export default function AlertsBanner() {
  const { lang } = useLang();
  const t = useT(lang);

  const QUICK_ALERT_KEYS = ['alert1', 'alert2', 'alert3', 'alert4', 'alert5'];

  return (
    <section className="py-12 bg-[#0a1628]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-shield-card border border-shield-gold/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-shield-gold" />
            <p className="text-xs text-shield-gold font-bold uppercase tracking-wider">{t('banner_title')}</p>
          </div>
          <div className="space-y-2">
            {QUICK_ALERT_KEYS.map((key, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-shield-dark border border-shield-border rounded-xl">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <span className="text-sm text-gray-300">{t(key)}</span>
              </div>
            ))}
          </div>
          <a href="/alerts" className="mt-4 inline-block text-shield-green text-sm font-semibold hover:text-green-400 transition-colors">
            {t('banner_see_all')}
          </a>
        </div>
      </div>
    </section>
  );
}