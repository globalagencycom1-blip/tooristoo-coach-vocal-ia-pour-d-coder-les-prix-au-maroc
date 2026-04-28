import React, { useState } from 'react';
import { TrendingDown, Shield, AlertTriangle, History, ExternalLink, ChevronRight } from 'lucide-react';
import { useT } from '../../lib/i18n';
import NegotiationDetailModal from './NegotiationDetailModal';

export default function Dashboard({ lang, profile, negotiations }) {
  const t = useT(lang);
  const [selected, setSelected] = useState(null);
  const totalSavings = negotiations.reduce((acc, n) => acc + (n.savings || 0), 0);
  const scamsAvoided = negotiations.filter(n => n.scam_detected).length;

  const stats = [
    { icon: TrendingDown, label: t('total_savings'), value: `${totalSavings} MAD`, color: 'text-shield-green' },
    { icon: History, label: t('total_negotiations'), value: negotiations.length, color: 'text-blue-400' },
    { icon: AlertTriangle, label: t('scams_avoided'), value: scamsAvoided, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ icon: IconComp, label, value, color }) => (
          <div key={label} className="bg-shield-card border border-shield-border rounded-xl p-4 text-center">
            <IconComp className={`w-5 h-5 mx-auto mb-2 ${color}`} />
            <div className={`font-poppins font-black text-xl ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* History */}
      <div>
        <h3 className="font-poppins font-semibold text-white text-sm mb-4">{t('history_title')}</h3>
        {negotiations.length === 0 ? (
          <div className="text-center py-12 bg-shield-card border border-shield-border rounded-xl">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">{t('no_history')}</p>
            <p className="text-gray-600 text-xs mt-1">{t('start_negotiation')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {negotiations.slice().reverse().map(neg => (
              <button
                key={neg.id}
                onClick={() => setSelected(neg)}
                className="w-full text-left bg-shield-card border border-shield-border rounded-xl p-4 hover:border-shield-green/40 hover:bg-shield-card/80 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-white capitalize">{neg.category}</span>
                      {neg.location && <span className="text-xs text-gray-500">· {neg.location}</span>}
                    </div>
                    {neg.price_asked > 0 && (
                      <div className="text-xs text-gray-400">
                        {neg.price_asked} MAD → {neg.price_estimated_min}-{neg.price_estimated_max} MAD
                      </div>
                    )}
                    {neg.savings > 0 && (
                      <div className="text-xs text-shield-green font-semibold mt-1">💰 -{neg.savings} MAD</div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {neg.scam_detected && (
                      <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
                        🚨 Arnaque
                      </span>
                    )}
                    {neg.risk_level && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        neg.risk_level === 'high' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                        neg.risk_level === 'medium' ? 'text-shield-gold bg-shield-gold/10 border-shield-gold/20' :
                        'text-shield-green bg-shield-green/10 border-shield-green/20'
                      }`}>
                        {neg.risk_level}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-shield-green mt-1 transition-colors" />
                  </div>
                </div>

                {/* Provider */}
                {neg.provider_name && (
                  <div className="mt-3 pt-3 border-t border-shield-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-shield-gold" />
                      <span className="text-xs text-gray-400">{neg.provider_name}</span>
                    </div>
                    {neg.provider_url && (
                      <span className="text-xs text-shield-gold flex items-center gap-1">
                        {t('view_provider')} <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

        )}
      </div>

      {selected && (
        <NegotiationDetailModal neg={selected} lang={lang} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}