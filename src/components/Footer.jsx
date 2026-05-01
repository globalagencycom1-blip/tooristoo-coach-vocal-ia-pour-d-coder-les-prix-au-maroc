import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useT } from '../lib/i18n';

export default function Footer({ lang }) {
  const t = useT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-shield-dark border-t border-shield-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
            <h4 className="text-white font-semibold text-sm mb-4">{t('footer_legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_privacy')}</Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_legal')}</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_terms')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-shield-green text-sm transition-colors">{t('footer_contact')}</Link>
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