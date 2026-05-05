import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Globe, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getNavbarT } from '../lib/navbar-translations';
import { base44 } from '@/api/base44Client';

const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'darija', label: 'DRJ', name: 'Darija', flag: '🇲🇦' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const t = useT(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => setCurrentUser(null));
  }, []);

  const handleLogin = () => base44.auth.redirectToLogin(window.location.href);
  const handleLogout = () => base44.auth.logout('/');

  const loginLabel = { fr: 'Se connecter', en: 'Sign in', es: 'Iniciar sesión', de: 'Anmelden', ar: 'دخول', darija: 'دخول' };
  const logoutLabel = { fr: 'Déconnexion', en: 'Sign out', es: 'Cerrar sesión', de: 'Abmelden', ar: 'خروج', darija: 'خروج' };

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/app', label: t('nav_app') },
    { href: '/blog', label: getNavbarT('nav_blog', lang) },
    { href: '/alerts', label: t('nav_alerts') },
    { href: '/providers', label: t('nav_providers') },
    { href: '/darija', label: '🇲🇦 Darija' },
    { href: '/about', label: t('nav_about') },
    { href: '/faq', label: getNavbarT('nav_faq', lang) },
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
              <span className="font-poppins font-bold text-white text-lg">Tooristoo</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-shield-green ${
                  location.pathname === link.href ? 'text-shield-green' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
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
                <span className="text-base leading-none">{LANGS.find(l => l.code === lang)?.flag || '🇫🇷'}</span>
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
                      <span className="text-base">{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-shield-border/50 hover:bg-shield-border text-gray-300 hover:text-white text-sm transition-all"
                >
                  <UserCircle className="w-4 h-4" />
                  <span className="max-w-[80px] truncate">{currentUser.full_name?.split(' ')[0] || 'Profil'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-shield-border text-gray-400 hover:text-white text-sm transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-shield-border text-gray-300 hover:text-white text-sm transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  {loginLabel[lang] || loginLabel.fr}
                </button>
                <Link
                  to="/app"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-shield-green text-black font-semibold text-sm rounded-xl hover:bg-green-400 transition-all btn-glow"
                >
                  {t('get_started')}
                </Link>
              </>
            )}

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
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-shield-green py-2 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-shield-green py-2 text-sm font-medium"
              >
                <UserCircle className="w-4 h-4" />
                {currentUser.full_name?.split(' ')[0] || 'Profil'}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white py-2 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                {logoutLabel[lang] || logoutLabel.fr}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 text-gray-300 hover:text-shield-green py-2 text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                {loginLabel[lang] || loginLabel.fr}
              </button>
              <Link
                to="/app"
                className="block w-full text-center px-4 py-2.5 bg-shield-green text-black font-semibold rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                {t('get_started')}
              </Link>
            </>
          )}
        </div>
      )}

      {/* Close dropdown on outside click */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </nav>
  );
}