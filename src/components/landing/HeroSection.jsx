import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Shield, TrendingDown, Star, ChevronRight } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function HeroSection({ lang }) {
  const t = useT(lang);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden moroccan-pattern">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-shield-dark via-[#0f2235] to-shield-dark" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20"
        style={{ background: 'radial-gradient(ellipse at top right, #22c55e22 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10"
        style={{ background: 'radial-gradient(ellipse at bottom left, #f59e0b22 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium">
              <span className="w-2 h-2 bg-shield-green rounded-full animate-pulse" />
              {t('hero_badge')}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                {t('hero_title')}
                <br />
                <span className="text-gradient-green">{t('hero_title2')}</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
                {t('hero_subtitle')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/app"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-shield-green text-black font-bold rounded-2xl hover:bg-green-400 transition-all btn-glow text-lg"
              >
                <Mic className="w-5 h-5" />
                {t('hero_cta')}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-shield-border text-gray-300 font-semibold rounded-2xl hover:border-shield-green/50 hover:text-shield-green transition-all"
              >
                {t('hero_cta2')}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: t('hero_stat1'), label: t('hero_stat1_label') },
                { value: t('hero_stat2'), label: t('hero_stat2_label') },
                { value: t('hero_stat3'), label: t('hero_stat3_label') },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-poppins font-black text-2xl text-shield-green">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Phone mockup */}
          <div className="relative flex justify-center float-animation">
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-[3rem] bg-shield-green/5 blur-3xl scale-110" />
              
              {/* Phone */}
              <div className="relative w-72 bg-[#0a1628] rounded-[3rem] border-2 border-shield-border shadow-2xl overflow-hidden" style={{ height: '580px' }}>
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-gray-400">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 bg-white rounded-sm" />
                    <div className="w-3 h-1.5 bg-white rounded-sm" />
                    <div className="w-3 h-1.5 bg-white rounded-sm opacity-50" />
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-shield-border/30">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-shield-green" />
                    <div>
                      <div className="font-poppins font-bold text-white text-sm">Tooristoo</div>
                      <div className="text-xs text-shield-green">{t('app_page_subtitle')}</div>
                    </div>
                  </div>
                </div>

                {/* Mic area */}
                <div className="flex flex-col items-center justify-center py-10 px-6">
                  {/* Mic button */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-shield-green/20 scale-150 pulse-ring" />
                    <div className="absolute inset-0 rounded-full bg-shield-green/10 scale-125" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-shield-green to-green-600 flex items-center justify-center shadow-xl btn-glow">
                      <Mic className="w-10 h-10 text-black" />
                    </div>
                  </div>

                  {/* Wave bars */}
                  <div className="flex items-center gap-1 mb-4 h-8">
                    {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-shield-green rounded-full wave-animation"
                        style={{ height: `${h * 32}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  <p className="text-white font-semibold text-sm">{t('app_listening')}</p>
                  <p className="text-shield-green text-xs mt-1">{t('app_speak')}</p>

                  <button className="mt-6 px-6 py-2.5 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-xs font-semibold">
                    ■ {t('app_stop')}
                  </button>
                </div>

                {/* AI message */}
                <div className="mx-4 p-4 bg-shield-border/30 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-shield-green/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-shield-green" />
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{t('app_greeting')}</p>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around py-4 bg-[#0a1628] border-t border-shield-border/30">
                  {['🏠', '🤝', '🕐', '👤'].map((icon, i) => (
                    <button key={i} className="flex flex-col items-center gap-1">
                      <span className="text-lg">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-16 top-20 glass-card rounded-2xl p-3 hidden lg:block">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-shield-green" />
                  <div>
                    <div className="text-xs font-bold text-white">-150 MAD</div>
                    <div className="text-xs text-gray-400">Économisé</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 bottom-32 glass-card rounded-2xl p-3 hidden lg:block">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-shield-gold fill-shield-gold" />)}
                </div>
                <div className="text-xs text-white font-semibold mt-1">5/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}