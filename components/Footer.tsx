import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { IqraLogo } from './Icons';
import { TranslationKey } from '../constants/translations';

const Footer: React.FC = () => {
  const { t } = useLocalization();
  
  const navLinks: { href: string, key: TranslationKey }[] = [
    { href: '#features', key: 'nav_features' },
    { href: '#examples', key: 'nav_examples' },
    { href: '#testimonials', key: 'nav_testimonials' },
    { href: '#community', key: 'nav_community' },
  ];

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <IqraLogo className="h-7 w-7 text-teal-400" />
            <span>{t('iqra_logo_text')}</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navLinks.map(link => (
              <a key={link.key} href={link.href} className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
                {t(link.key)}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>{t('footer_copyright', { year: new Date().getFullYear().toString() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;