import React from 'react';
import { TrendingDown, AlertTriangle, History, MapPin, Tag, Shield } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { getDashboardT, getCategoryName, getCityName } from '../../lib/dashboard-translations';

export default function DashboardStats({ lang, profile, negotiations }) {
  const t = useT(lang);
  const dt = (key) => getDashboardT(key, lang);

  const totalSavings = negotiations.reduce((acc, n) => acc + (n.savings || 0), 0);
  const scamsAvoided = negotiations.filter(n => n.scam_detected).length;

  // Category breakdown
  const byCategory = negotiations.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // City breakdown
  const byCity = negotiations.reduce((acc, n) => {
    if (n.location) acc[n.location] = (acc[n.location] || 0) + 1;
    return acc;
  }, {});
  const topCities = Object.entries(byCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Risk distribution — normalize various formats (French, English, mixed case, accents)
  const normalizeRisk = (val) => {
    if (!val) return null;
    // Remove accents and lowercase
    const v = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (['high', 'eleve', 'haut'].includes(v)) return 'high';
    if (['medium', 'moyen', 'modere', 'moderate'].includes(v)) return 'medium';
    if (['low', 'faible', 'bas'].includes(v)) return 'low';
    return null;
  };
  const riskCounts = {
    high: negotiations.filter(n => normalizeRisk(n.risk_level) === 'high').length,
    medium: negotiations.filter(n => normalizeRisk(n.risk_level) === 'medium').length,
    low: negotiations.filter(n => normalizeRisk(n.risk_level) === 'low').length,
  };
  const riskTotal = riskCounts.high + riskCounts.medium + riskCounts.low || 1;
  const total = negotiations.length || 1;

  const stats = [
    { icon: TrendingDown, label: t('total_savings'), value: `${totalSavings} MAD`, color: 'text-shield-green', bg: 'bg-shield-green/10', border: 'border-shield-green/20' },
    { icon: History, label: t('total_negotiations'), value: negotiations.length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: AlertTriangle, label: t('scams_avoided'), value: scamsAvoided, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  ];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ icon: IconComp, label, value, color, bg, border }) => (
          <div key={label} className={`bg-shield-card border ${border} rounded-xl p-4 text-center`}>
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <IconComp className={`w-4 h-4 ${color}`} />
            </div>
            <div className={`font-poppins font-black text-xl ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {negotiations.length === 0 ? (
        <div className="text-center py-12 bg-shield-card border border-shield-border rounded-xl">
          <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{t('no_history')}</p>
          <p className="text-gray-600 text-xs mt-1">{t('start_negotiation')}</p>
        </div>
      ) : (
        <>
          {/* Risk distribution */}
          <div className="bg-shield-card border border-shield-border rounded-xl p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{dt('risk_distribution')}</h3>
            <div className="space-y-3">
              {[
                { key: 'high', label: dt('high'), color: 'bg-red-500', textColor: 'text-red-400', count: riskCounts.high },
                { key: 'medium', label: dt('medium'), color: 'bg-shield-gold', textColor: 'text-shield-gold', count: riskCounts.medium },
                { key: 'low', label: dt('low'), color: 'bg-shield-green', textColor: 'text-shield-green', count: riskCounts.low },
              ].map(({ key, label, color, textColor, count }) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={textColor}>{label}</span>
                    <span className="text-gray-400">{count} / {riskTotal}</span>
                  </div>
                  <div className="h-2 bg-shield-border rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{ width: `${(count / riskTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top categories */}
          {topCategories.length > 0 && (
            <div className="bg-shield-card border border-shield-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{dt('frequent_categories')}</h3>
              </div>
              <div className="space-y-2">
                {topCategories.map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm text-white capitalize">{getCategoryName(cat, lang)}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-shield-green/30 rounded-full overflow-hidden w-20">
                        <div
                          className="h-full bg-shield-green rounded-full"
                          style={{ width: `${(count / negotiations.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-4 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top cities */}
          {topCities.length > 0 && (
            <div className="bg-shield-card border border-shield-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{dt('visited_cities')}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {topCities.map(([city, count]) => (
                  <div key={city} className="flex items-center justify-between bg-shield-dark border border-shield-border rounded-lg px-3 py-2">
                    <span className="text-sm text-white">{getCityName(city, lang)}</span>
                    <span className="text-xs text-shield-green font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Average savings */}
          {totalSavings > 0 && (
            <div className="bg-shield-green/10 border border-shield-green/30 rounded-xl p-5 flex items-center gap-4">
              <span className="text-4xl">💰</span>
              <div>
                 <div className="text-shield-green font-black text-2xl font-poppins">{totalSavings} MAD</div>
                 <div className="text-xs text-gray-400">{dt('saved_total')}</div>
                 <div className="text-xs text-shield-green/70 mt-0.5">
                   ~{Math.round(totalSavings / negotiations.length)} {dt('average_per_negotiation')}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}