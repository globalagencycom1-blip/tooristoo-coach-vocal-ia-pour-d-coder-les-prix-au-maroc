import React from 'react';
import { Shield } from 'lucide-react';
import { useT } from '../lib/i18n';

export default function Footer({ lang }) {
  const t = useT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-shield-dark border-t border-shield-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-shield-green" />
              <span className="font-poppins font-bold text-white">Tooristoo</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{t('footer_desc')}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-2xl">🇲🇦</span>
              <span className="text-xs text-gray-600">Made for Morocco</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{lang === 'fr' ? 'Produit' : 'Product'}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/app" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'Application' : 'App'}</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'Blog' : 'Blog'}</a>
              </li>
              <li>
                <a href="/alertes" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'Alertes' : 'Alerts'}</a>
              </li>
              <li>
                <a href="/prestataires" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'Prestataires' : 'Providers'}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{lang === 'fr' ? 'Ressources' : 'Resources'}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'FAQ' : 'FAQ'}</a>
              </li>
              <li>
                <a href="/about" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'À propos' : 'About'}</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_contact')}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t('footer_legal')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_privacy')}</a>
              </li>
              <li>
                <a href="/legal" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{lang === 'fr' ? 'Mentions légales' : 'Legal Notice'}</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_terms')}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-shield-border pt-8 text-center">
          <p className="text-gray-600 text-sm">© {year} Tooristoo. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}