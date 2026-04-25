import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star, ExternalLink, RefreshCw, Shield } from 'lucide-react';
import { useT } from '../../lib/i18n';

const RiskBadge = ({ level, t }) => {
  const config = {
    low: { label: t('risk_low'), color: 'text-shield-green bg-shield-green/10 border-shield-green/30' },
    medium: { label: t('risk_medium'), color: 'text-shield-gold bg-shield-gold/10 border-shield-gold/30' },
    high: { label: t('risk_high'), color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  };
  const c = config[level] || config.medium;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${c.color}`}>
      {c.label}
    </span>
  );
};

export default function AnalysisResult({ analysis, lang, onReset }) {
  const t = useT(lang);

  const savings = analysis.price_asked && analysis.price_estimated_max
    ? Math.max(0, analysis.price_asked - analysis.price_estimated_max)
    : analysis.savings || 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-bold text-white text-lg">{t('analysis_ai')}</h3>
        <button onClick={onReset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-shield-green transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          Recommencer
        </button>
      </div>

      {/* Savings banner */}
      {savings > 0 && (
        <div className="p-4 bg-shield-green/10 border border-shield-green/30 rounded-xl flex items-center gap-3">
          <span className="text-3xl">💰</span>
          <div>
            <div className="text-shield-green font-bold text-lg">-{savings} MAD</div>
            <div className="text-xs text-gray-400">Économie potentielle</div>
          </div>
        </div>
      )}

      {/* Scam alert */}
      {analysis.scam_detected && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm font-semibold">🚨 Arnaque détectée !</p>
        </div>
      )}

      {/* Price analysis */}
      <div className="bg-shield-card border border-shield-border rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{t('analysis_real_price')}</span>
          <span className="text-white font-bold">{analysis.price_estimated_min} – {analysis.price_estimated_max} MAD</span>
        </div>
        {analysis.price_asked > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{t('analysis_price_asked')}</span>
            <span className="text-red-400 font-bold">{analysis.price_asked} MAD</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{t('analysis_risk')}</span>
          <RiskBadge level={analysis.risk_level} t={t} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{t('analysis_trust')}</span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-3.5 h-3.5 ${i <= (analysis.vendor_trust_score || 3) ? 'text-shield-gold fill-shield-gold' : 'text-gray-600'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis text */}
      {analysis.ai_analysis && (
        <div className="bg-shield-card border border-shield-border rounded-xl p-5">
          <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">Analyse</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{analysis.ai_analysis}</p>
        </div>
      )}

      {/* Strategy */}
      {analysis.strategy && (
        <div className="bg-shield-card border border-shield-border rounded-xl p-5">
          <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('analysis_strategy')}</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{analysis.strategy}</p>
        </div>
      )}

      {/* Exact phrase */}
      {analysis.recommended_phrase && (
        <div className="bg-shield-card border border-shield-green/30 rounded-xl p-5 card-glow">
          <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('analysis_phrase')}</h4>
          <blockquote className="text-gray-200 text-sm leading-relaxed italic border-l-2 border-shield-green pl-4">
            "{analysis.recommended_phrase}"
          </blockquote>
        </div>
      )}

      {/* Provider redirect */}
      {analysis.provider_name && (
        <div className="bg-shield-card border border-shield-gold/20 rounded-xl p-5 card-glow-gold">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-shield-gold" />
            <h4 className="text-xs font-bold text-shield-gold uppercase tracking-wider">{t('recommended_providers')}</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">{analysis.provider_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">Prestataire vérifié ✓</p>
            </div>
            {analysis.provider_url && (
              <a
                href={analysis.provider_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-shield-gold/10 border border-shield-gold/30 text-shield-gold text-xs font-semibold rounded-lg hover:bg-shield-gold/20 transition-colors"
              >
                {t('view_provider')}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}