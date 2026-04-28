import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Globe } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'ar', label: 'AR', name: 'العربية' },
  { code: 'darija', label: 'DRJ', name: 'Darija' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const t = useT(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileOpen(false);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navLinks = [
    { href: '#home', label: t('nav_home'), isAnchor: true },
    { href: '/app', label: t('nav_app'), isAnchor: false },
    { href: '/alerts', label: t('nav_alerts'), isAnchor: false },
    { href: '/providers', label: t('nav_providers'), isAnchor: false },
    { href: '/about', label: t('nav_about'), isAnchor: false },
    { href: '/faq', label: t('nav_faq'), isAnchor: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-shield-dark/95 backdrop-blur-md border-b border-shield-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-shield-green" fill="rgba(34,197,94,0.2)" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-shield-green font-bold text-xs">★</span>
              </div>
            </div>
            <div>
              <span className="font-poppins font-bold text-white text-lg">NegoShield</span>
              <span className="font-poppins font-bold text-shield-green text-lg ml-1">AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => link.isAnchor && handleAnchorClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-shield-green ${
                  (link.isAnchor && location.pathname === '/') || location.pathname === link.href ? 'text-shield-green' : 'text-gray-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-shield-border/50 hover:bg-shield-border text-gray-300 hover:text-white text-sm transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{LANGS.find(l => l.code === lang)?.label || 'FR'}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-shield-card border border-shield-border rounded-xl shadow-2xl overflow-hidden z-50">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-shield-border flex items-center gap-3 ${lang === l.code ? 'text-shield-green bg-shield-border/50' : 'text-gray-300'}`}
                    >
                      <span className="font-mono text-xs font-bold w-8">{l.label}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/app"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-shield-green text-black font-semibold text-sm rounded-xl hover:bg-green-400 transition-all btn-glow"
            >
              {t('get_started')}
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-300 hover:text-white">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
       <div className="md:hidden bg-shield-card border-t border-shield-border px-4 py-4 space-y-3">
         {navLinks.map(link => (
           <a
             key={link.href}
             href={link.href}
             onClick={(e) => link.isAnchor ? handleAnchorClick(e, link.href) : setMobileOpen(false)}
             className="block text-gray-300 hover:text-shield-green py-2 text-sm font-medium"
           >
             {link.label}
           </a>
         ))}
          <Link
            to="/app"
            className="block w-full text-center px-4 py-2.5 bg-shield-green text-black font-semibold rounded-xl"
            onClick={() => setMobileOpen(false)}
          >
            {t('get_started')}
          </Link>
        </div>
      )}

      {/* Close dropdown on outside click */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </nav>
  );
}