import React from 'react';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

const badgeColors = {
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
};

export default function Alerts() {
  const { lang } = useLang();
  const t = useT(lang);

  const ALERTS = [
    { color: 'yellow', badgeColor: 'red', badgeKey: 'badge_frequent', titleKey: 'alert_title1', descKey: 'alert_desc1', tipKey: 'alert_tip1' },
    { color: 'yellow', badgeColor: 'orange', badgeKey: 'badge_attention', titleKey: 'alert_title2', descKey: 'alert_desc2', tipKey: 'alert_tip2' },
    { color: 'yellow', badgeColor: 'red', badgeKey: 'badge_frequent', titleKey: 'alert_title3', descKey: 'alert_desc3', tipKey: 'alert_tip3' },
    { color: 'yellow', badgeColor: 'orange', badgeKey: 'badge_attention', titleKey: 'alert_title4', descKey: 'alert_desc4', tipKey: 'alert_tip4' },
    { color: 'red', badgeColor: 'red', badgeKey: 'badge_danger', titleKey: 'alert_title5', descKey: 'alert_desc5', tipKey: 'alert_tip5' },
    { color: 'red', badgeColor: 'red', badgeKey: 'badge_danger', titleKey: 'alert_title6', descKey: 'alert_desc6', tipKey: 'alert_tip6' },
    { color: 'yellow', badgeColor: 'orange', badgeKey: 'badge_attention', titleKey: 'alert_title7', descKey: 'alert_desc7', tipKey: 'alert_tip7' },
    { color: 'yellow', badgeColor: 'orange', badgeKey: 'badge_attention', titleKey: 'alert_title8', descKey: 'alert_desc8', tipKey: 'alert_tip8' },
  ];

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-red-400" />
            <h1 className="font-poppins font-black text-2xl text-white">{t('alerts_page_title')}</h1>
          </div>
          <p className="text-gray-400 text-sm">{t('alerts_page_subtitle')}</p>
        </div>

        {/* Detailed alerts */}
        <div id="details" className="space-y-4">
          {ALERTS.map((alert, i) => (
            <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-5 hover:border-shield-border/80 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    alert.color === 'red' ? 'bg-red-500/15' : 'bg-yellow-500/15'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${alert.color === 'red' ? 'text-red-400' : 'text-yellow-400'}`} />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">{t(alert.titleKey)}</h3>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ml-2 ${badgeColors[alert.badgeColor]}`}>
                  {t(alert.badgeKey)}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3 pl-12">{t(alert.descKey)}</p>
              <div className="flex items-start gap-2 pl-12">
                <CheckCircle className="w-3.5 h-3.5 text-shield-green flex-shrink-0 mt-0.5" />
                <p className="text-xs text-shield-green leading-relaxed">{t(alert.tipKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 p-5 bg-shield-green/10 border border-shield-green/20 rounded-2xl text-center">
          <Shield className="w-8 h-8 text-shield-green mx-auto mb-2" />
          <p className="text-white font-semibold text-sm mb-1">{t('alerts_cta_use')}</p>
          <p className="text-gray-400 text-xs mb-4">{t('alerts_cta_desc')}</p>
          <Link to="/app" className="inline-flex items-center gap-2 px-6 py-2.5 bg-shield-green text-black font-bold text-sm rounded-xl hover:bg-green-400 transition-all btn-glow">
            {t('alerts_cta_btn')}
          </Link>
        </div>

      </div>
    </div>
  );
}