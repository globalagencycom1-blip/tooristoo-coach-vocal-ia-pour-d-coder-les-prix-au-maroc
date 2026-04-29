import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star, ExternalLink, RefreshCw, Shield, ChevronLeft, TrendingDown } from 'lucide-react';
import { useT } from '../../lib/i18n';
import ScamReportingPanel from './ScamReportingPanel';
import VoiceOutput from './VoiceOutput';

export default function AnalysisResult({ analysis, lang, onReset }) {
  const t = useT(lang);

  const savings = analysis.price_asked && analysis.price_estimated_max
    ? Math.max(0, analysis.price_asked - analysis.price_estimated_max)
    : analysis.savings || 0;

  const overchargePercent = analysis.price_asked && analysis.price_estimated_max
    ? Math.round(((analysis.price_asked - analysis.price_estimated_max) / analysis.price_estimated_max) * 100)
    : null;

  const riskConfig = {
    low: { label: t('risk_low'), color: 'text-shield-green', bg: 'bg-shield-green/10', border: 'border-shield-green/30', icon: '🟢' },
    medium: { label: t('risk_medium'), color: 'text-shield-gold', bg: 'bg-shield-gold/10', border: 'border-shield-gold/30', icon: '🟡' },
    high: { label: t('risk_high'), color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🔴' },
  };
  const risk = riskConfig[analysis.risk_level] || riskConfig.medium;

  // Parse strategy into bullet points
  const strategyPoints = analysis.strategy
    ? analysis.strategy.split(/[.\n]/).map(s => s.trim()).filter(s => s.length > 10)
    : [];

  // Parse ai_analysis for anomaly detection
  const isAnomaly = analysis.scam_detected || (overchargePercent && overchargePercent > 15);

  return (
    <div className="space-y-3">
      {/* Back button */}
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-2"
      >
        <ChevronLeft className="w-4 h-4" />
        {t('back')}
      </button>

      {/* Section 1: Situation */}
      <div className="bg-shield-card border border-shield-border rounded-2xl p-4">
        <h3 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('real_time_analysis')}</h3>
        {analysis.transcript && (
          <p className="text-sm text-gray-300 mb-2">
            <span className="text-gray-500">{t('situation')} </span>{analysis.transcript}
          </p>
        )}
        {analysis.price_asked > 0 && (
          <p className="text-sm text-gray-300">
            <span className="text-gray-500">{t('price_asked')} </span>
            <span className="text-white font-bold">{analysis.price_asked} MAD</span>
          </p>
        )}
        {analysis.category && (
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-gray-500">{t('category_label')} </span>
            <span className="text-white capitalize">{analysis.category}</span>
            {analysis.location && <span className="text-gray-500"> · {analysis.location}</span>}
          </p>
        )}
      </div>

      {/* Section 2: AI Analysis */}
      <div className="bg-shield-card border border-shield-border rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-shield-green uppercase tracking-wider">{t('ai_analysis_title')}</h3>

        {/* Real price */}
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-shield-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-400">{t('estimated_price')} :</p>
            <p className="text-shield-green font-black text-lg font-poppins">
              {analysis.price_estimated_min} – {analysis.price_estimated_max} MAD
            </p>
          </div>
        </div>

        {/* Anomaly */}
        {isAnomaly && (
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-red-400 font-semibold">{t('anomaly_detected')} :</p>
              <p className="text-xs text-gray-300 leading-relaxed">{analysis.ai_analysis}</p>
            </div>
          </div>
        )}

        {/* Overcharge % */}
        {overchargePercent && overchargePercent > 0 && (
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-400 font-semibold">
              {t('price_above_market').replace('%d%', overchargePercent)}
            </p>
          </div>
        )}

        {/* AI analysis text (if no anomaly showed it) */}
        {!isAnomaly && analysis.ai_analysis && (
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-shield-green flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">{analysis.ai_analysis}</p>
          </div>
        )}
      </div>

      {/* Section 3: Risk + Trust */}
      <div className={`${risk.bg} border ${risk.border} rounded-2xl p-4 flex items-center justify-between`}>
        <div>
          <p className="text-xs text-gray-400 mb-1">{t('risk_level')}</p>
          <div className="flex items-center gap-2">
            <span className="text-base">{risk.icon}</span>
            <span className={`font-black text-lg font-poppins ${risk.color}`}>{risk.label}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">{t('vendor_trust')}</p>
          {(() => {
            // Map risk level to trust score: low=5 stars, medium=3 stars, high=1 star
            const riskToTrust = {
              low: 5,
              medium: 3,
              high: 1,
            };
            const trustScore = riskToTrust[analysis.risk_level] || 3;
            return (
              <>
                <div className="flex gap-0.5 justify-end">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i <= trustScore ? 'text-shield-gold fill-shield-gold' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">({trustScore}/5)</p>
              </>
            );
          })()}
        </div>
      </div>

      {/* Section 4: Strategy */}
      {strategyPoints.length > 0 && (
        <div className="bg-shield-card border border-shield-border rounded-2xl p-4">
          <h3 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('recommended_strategy')}</h3>
          <ul className="space-y-2">
            {strategyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-shield-green flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 leading-relaxed">{point}.</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section 5: Exact phrase */}
      {analysis.recommended_phrase && (
        <div className="bg-shield-card border border-shield-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-shield-green uppercase tracking-wider">{t('exact_phrase')}</h3>
            <VoiceOutput text={analysis.recommended_phrase} lang={lang} label={`🔊 ${t('listen')}`} />
          </div>
          <div className="relative pl-6">
            <span className="absolute left-0 top-0 text-3xl text-shield-green/30 font-serif leading-none">"</span>
            <p className="text-sm text-gray-200 leading-relaxed italic">
              {analysis.recommended_phrase}"
            </p>
          </div>
          {analysis.recommended_phrase_darija && (
            <div className="mt-3 pt-3 border-t border-shield-border">
              <span className="text-xs text-shield-gold font-semibold">🇲🇦 {t('in_darija')} </span>
              <span className="text-xs text-gray-300 italic">"{analysis.recommended_phrase_darija}"</span>
              <div className="mt-1">
                <VoiceOutput text={analysis.recommended_phrase_darija} lang="darija" label="🔊 Darija" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section 6: Anti-scam alerts */}
      {analysis.scam_detected && (
        <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">{t('anti_scam_alerts')}</h3>
            <span className="text-xs text-shield-green flex items-center gap-1">
              <Shield className="w-3 h-3" /> {t('protection')}
            </span>
          </div>
          <ul className="space-y-2">
            {[
              t('scam_alert1'),
              t('scam_alert2'),
              t('scam_alert3'),
              t('scam_alert4'),
            ].map((alert, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300">{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section 7: Savings banner */}
      {savings > 0 && (
        <div className="bg-shield-card border border-shield-green/20 rounded-2xl p-5 text-center">
          <p className="text-xs text-shield-green uppercase tracking-wider mb-1">{t('potential_savings')}</p>
          <p className="font-black text-4xl font-poppins text-white">{savings} MAD</p>
          <p className="text-xs text-gray-500 mt-1">{t('estimation_on_transaction')}</p>
        </div>
      )}

      {/* Section 8: Provider */}
      {analysis.provider_name && (
        <div className="bg-shield-card border border-shield-gold/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-shield-gold" />
            <h3 className="text-xs font-bold text-shield-gold uppercase tracking-wider">{t('recommended_providers')}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">{analysis.provider_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('provider_verified')}</p>
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

      {/* Section 9: Community Scam Reporting */}
      <ScamReportingPanel analysis={analysis} lang={lang} />
    </div>
  );
}