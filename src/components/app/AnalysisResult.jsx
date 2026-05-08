import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star, ExternalLink, RefreshCw, Shield, ChevronLeft, TrendingDown, Phone, MapPin } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { getCategoryLabel, getCityLabel } from '../../lib/categories-cities-translations';
import ScamReportingPanel from './ScamReportingPanel';
import VoiceOutput from './VoiceOutput';
import NegotiationContinue from './NegotiationContinue';

// Helper pour récupérer la description multilingue d'un prestataire
const getProviderDesc = (p, lang) => {
  if (!p) return '';
  return p[`desc_${lang}`] || p.desc_fr || p.desc_en || '';
};

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
            <span className="text-white font-bold">{analysis.price_asked} DH</span>
          </p>
        )}
        {analysis.category && (
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-gray-500">{t('category_label')} </span>
            <span className="text-white capitalize">{getCategoryLabel(analysis.category, lang)}</span>
            {analysis.location && <span className="text-gray-500"> · {getCityLabel(analysis.location, lang)}</span>}
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
              {analysis.price_estimated_min} – {analysis.price_estimated_max} DH
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

      {/* Section 5: Exact phrase — HERO CARD */}
      {analysis.recommended_phrase && (
        <div className="rounded-2xl overflow-hidden border-2 border-shield-green/60 card-glow"
          style={{ background: 'linear-gradient(135deg, #0a1f14 0%, #0d2218 60%, #081a10 100%)' }}>
          {/* Header strip */}
          <div className="flex items-center justify-between px-4 py-3 bg-shield-green/10 border-b border-shield-green/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shield-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-shield-green"></span>
              </span>
              <h3 className="text-xs font-bold text-shield-green uppercase tracking-widest">{t('exact_phrase')}</h3>
            </div>
            <span className="text-xs bg-shield-green/20 text-shield-green px-2 py-0.5 rounded-full font-semibold">
              💬 {lang === 'fr' ? 'Dites exactement' : lang === 'en' ? 'Say exactly' : lang === 'es' ? 'Diga exactamente' : lang === 'de' ? 'Sagen Sie' : 'قل بالضبط'}
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Main phrase */}
            <p className="text-base text-white leading-relaxed font-medium italic"
              dir={['ar','darija'].includes(lang) ? 'rtl' : 'ltr'}>
              "{analysis.recommended_phrase}"
            </p>

            {/* Darija audio hero */}
            {analysis.recommended_phrase_darija && (
              <div className="bg-shield-dark/60 rounded-xl p-4 border border-shield-green/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🇲🇦</span>
                      <span className="text-xs font-bold text-shield-gold uppercase tracking-wider">{t('in_darija')}</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed" dir="rtl">
                      "{analysis.recommended_phrase_darija}"
                    </p>
                  </div>
                  {/* BIG audio button */}
                  <div className="flex-shrink-0">
                    <VoiceOutput
                      text={analysis.recommended_phrase_darija}
                      lang="darija"
                      label="Darija"
                    />
                  </div>
                </div>
              </div>
            )}
            </div>
        </div>
      )}

      {/* Section 6: Continue Negotiation */}
      <NegotiationContinue analysis={analysis} lang={lang} />

      {/* Section 7b: Vigilance tips */}
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
          <p className="font-black text-4xl font-poppins text-white">{savings} DH</p>
          <p className="text-xs text-gray-500 mt-1">{t('estimation_on_transaction')}</p>
        </div>
      )}

      {/* Section 8: Prestataire référencé Tooristoo */}
      {!analysis.refused && (
        <>
          {analysis.main_provider ? (
            <div className="bg-shield-card border border-shield-gold/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-shield-gold" />
                <h3 className="text-xs font-bold text-shield-gold uppercase tracking-wider">
                  {t('recommended_providers')}
                </h3>
              </div>

              {/* Carte du prestataire principal */}
              <div className="space-y-3">
                {/* Header : nom + note */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-white font-bold text-sm leading-tight">
                        {analysis.main_provider.name}
                      </h4>
                      {analysis.main_provider.certified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-shield-green/10 border border-shield-green/40 text-shield-green text-[10px] font-semibold rounded-full whitespace-nowrap">
                          <CheckCircle className="w-2.5 h-2.5" />
                          {t('provider_verified')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {getCityLabel(analysis.main_provider.city, lang)} · {getCategoryLabel(analysis.main_provider.category, lang)}
                      </span>
                    </div>
                  </div>
                  {analysis.main_provider.rating && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-shield-gold fill-shield-gold" />
                      <span className="text-white font-bold text-sm">
                        {analysis.main_provider.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description multilingue */}
                {getProviderDesc(analysis.main_provider, lang) && (
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {getProviderDesc(analysis.main_provider, lang)}
                  </p>
                )}

                {/* Prix de référence du prestataire */}
                {analysis.main_provider.price && (
                  <p className="text-xs text-shield-green font-semibold">
                    {t('providers_official_price')} {analysis.main_provider.price}
                  </p>
                )}

                {/* Boutons d'action */}
                <div className="flex flex-wrap items-center gap-2">
                  {analysis.main_provider.phone && (
                    <a
                      href={`tel:${analysis.main_provider.phone}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-shield-border/50 hover:bg-shield-border text-gray-300 hover:text-white text-xs rounded-lg transition-all"
                    >
                      <Phone className="w-3 h-3" />
                      {analysis.main_provider.phone}
                    </a>
                  )}
                  {analysis.main_provider.url && (
                    <a
                      href={analysis.main_provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-shield-gold/10 border border-shield-gold/30 text-shield-gold text-xs font-semibold rounded-lg hover:bg-shield-gold/20 transition-all"
                    >
                      {t('view_provider')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bouton "Voir les autres" si plus d'un prestataire dispo */}
              {analysis.other_providers_count > 0 && (
                <div className="mt-4 pt-3 border-t border-shield-border">
                  <a
                    href={`/providers?city=${encodeURIComponent(analysis.location)}&category=${encodeURIComponent(analysis.category)}`}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-shield-green/5 hover:bg-shield-green/10 border border-shield-green/20 hover:border-shield-green/40 text-shield-green text-xs font-semibold rounded-lg transition-all"
                  >
                    <span>
                      {lang === 'en' ? `See ${analysis.other_providers_count} other listed provider${analysis.other_providers_count > 1 ? 's' : ''}` :
                       lang === 'es' ? `Ver ${analysis.other_providers_count} otro${analysis.other_providers_count > 1 ? 's' : ''} proveedor${analysis.other_providers_count > 1 ? 'es' : ''}` :
                       lang === 'de' ? `${analysis.other_providers_count} weitere Anbieter ansehen` :
                       lang === 'ar' ? `شاهد ${analysis.other_providers_count} مزود${analysis.other_providers_count > 1 ? 'ين آخرين' : ' آخر'}` :
                       lang === 'darija' ? `شوف ${analysis.other_providers_count} ${analysis.other_providers_count > 1 ? 'مزودين خرين' : 'مزود آخر'}` :
                       `Voir ${analysis.other_providers_count} autre${analysis.other_providers_count > 1 ? 's' : ''} prestataire${analysis.other_providers_count > 1 ? 's' : ''} référencé${analysis.other_providers_count > 1 ? 's' : ''}`
                      }
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            // Aucun prestataire référencé pour cette catégorie+ville
            <div className="bg-shield-card border border-shield-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {t('recommended_providers')}
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                {lang === 'en' ? `Tooristoo doesn't have any certified ${analysis.category} listed in ${analysis.location} yet. Our directory is growing — check back soon.` :
                 lang === 'es' ? `Tooristoo aún no tiene ningún ${analysis.category} certificado en ${analysis.location}. Nuestro directorio está creciendo — vuelve pronto.` :
                 lang === 'de' ? `Tooristoo hat noch keinen zertifizierten ${analysis.category} in ${analysis.location}. Unser Verzeichnis wächst — schauen Sie bald wieder vorbei.` :
                 lang === 'ar' ? `Tooristoo ليس لديه بعد أي ${analysis.category} معتمد في ${analysis.location}. دليلنا في تطور — عد قريباً.` :
                 lang === 'darija' ? `Tooristoo معندوش بعدا ${analysis.category} معتمد ف${analysis.location}. الدليل ديالنا كيكبر — عاود زور قريباً.` :
                 `Tooristoo n'a pas encore de ${analysis.category} certifié référencé à ${analysis.location}. Notre annuaire grandit progressivement — revenez bientôt.`
                }
              </p>
              <a
                href="/providers"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-shield-green/10 hover:bg-shield-green/20 border border-shield-green/30 text-shield-green text-xs font-semibold rounded-lg transition-all"
              >
                {lang === 'en' ? 'Browse all listed providers' :
                 lang === 'es' ? 'Ver todos los proveedores' :
                 lang === 'de' ? 'Alle Anbieter ansehen' :
                 lang === 'ar' ? 'تصفح جميع المزودين' :
                 lang === 'darija' ? 'شوف جميع المزودين' :
                 'Voir tous les prestataires Tooristoo'
                }
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </>
      )}

      {/* Section 10: Community Scam Reporting */}
      <ScamReportingPanel analysis={analysis} lang={lang} />
    </div>
  );
}