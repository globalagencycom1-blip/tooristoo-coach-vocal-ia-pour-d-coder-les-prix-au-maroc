import React from 'react';
import { X, Shield, Star, ExternalLink, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function NegotiationDetailModal({ neg, lang, onClose }) {
  const t = useT(lang);
  if (!neg) return null;

  const savings = neg.price_asked && neg.price_estimated_max
    ? Math.max(0, neg.price_asked - neg.price_estimated_max)
    : neg.savings || 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-shield-card border border-shield-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-shield-card border-b border-shield-border flex items-center justify-between px-5 py-4 z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-shield-green" />
            <span className="font-poppins font-bold text-white capitalize">{neg.category}</span>
            {neg.location && <span className="text-xs text-gray-500">· {neg.location}</span>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Savings banner */}
          {savings > 0 && (
            <div className="p-4 bg-shield-green/10 border border-shield-green/30 rounded-xl flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-shield-green font-bold text-lg">-{savings} MAD</div>
                <div className="text-xs text-gray-400">Économie potentielle</div>
              </div>
            </div>
          )}

          {/* Scam alert */}
          {neg.scam_detected && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm font-semibold">🚨 Arnaque détectée !</p>
            </div>
          )}

          {/* Price analysis */}
          <div className="bg-shield-dark border border-shield-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{t('analysis_real_price')}</span>
              <span className="text-white font-bold">{neg.price_estimated_min} – {neg.price_estimated_max} MAD</span>
            </div>
            {neg.price_asked > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{t('analysis_price_asked')}</span>
                <span className="text-red-400 font-bold">{neg.price_asked} MAD</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{t('analysis_risk')}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                neg.risk_level === 'high' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                neg.risk_level === 'medium' ? 'text-shield-gold bg-shield-gold/10 border-shield-gold/20' :
                'text-shield-green bg-shield-green/10 border-shield-green/20'
              }`}>
                {neg.risk_level === 'high' ? t('risk_high') : neg.risk_level === 'medium' ? t('risk_medium') : t('risk_low')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{t('analysis_trust')}</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i <= (neg.vendor_trust_score || 3) ? 'text-shield-gold fill-shield-gold' : 'text-gray-600'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {neg.ai_analysis && (
            <div className="bg-shield-dark border border-shield-border rounded-xl p-4">
              <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">Analyse</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{neg.ai_analysis}</p>
            </div>
          )}

          {/* Strategy */}
          {neg.strategy && (
            <div className="bg-shield-dark border border-shield-border rounded-xl p-4">
              <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('analysis_strategy')}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{neg.strategy}</p>
            </div>
          )}

          {/* Phrase */}
          {neg.recommended_phrase && (
            <div className="bg-shield-dark border border-shield-green/30 rounded-xl p-4 card-glow">
              <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('analysis_phrase')}</h4>
              <blockquote className="text-gray-200 text-sm leading-relaxed italic border-l-2 border-shield-green pl-4 mb-3">
                "{neg.recommended_phrase}"
              </blockquote>
              {neg.recommended_phrase_darija && (
                <div className="mt-2 pt-2 border-t border-shield-border">
                  <span className="text-xs text-shield-gold font-semibold">🇲🇦 En Darija : </span>
                  <span className="text-xs text-gray-300 italic">"{neg.recommended_phrase_darija}"</span>
                </div>
              )}
              {savings > 0 && (
                <div className="mt-2 pt-2 border-t border-shield-border flex items-center gap-2">
                  <span className="text-xs text-gray-400">💸 Économie potentielle :</span>
                  <span className="text-xs font-bold text-shield-green">{savings} MAD</span>
                </div>
              )}
            </div>
          )}

          {/* Provider */}
          {neg.provider_name && (
            <div className="bg-shield-dark border border-shield-gold/20 rounded-xl p-4 card-glow-gold">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-shield-gold" />
                <h4 className="text-xs font-bold text-shield-gold uppercase tracking-wider">{t('recommended_providers')}</h4>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{neg.provider_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Prestataire vérifié ✓</p>
                </div>
                {neg.provider_url && (
                  <a
                    href={neg.provider_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
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
      </div>
    </div>
  );
}