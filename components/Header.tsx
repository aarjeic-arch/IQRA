import React, { useState, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { IqraLogo, MenuIcon, XIcon } from './Icons';
import { TranslationKey } from '../constants/translations';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks: { href: string, key: TranslationKey }[] = [
    { href: '#features', key: 'nav_features' },
    { href: '#examples', key: 'nav_examples' },
    { href: '#testimonials', key: 'nav_testimonials' },
    { href: '#community', key: 'nav_community' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold text-white">
            <IqraLogo className="h-8 w-8 text-teal-400" />
            <span>{t('iqra_logo_text')}</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.key} href={link.href} className="text-slate-300 hover:text-teal-400 transition-colors duration-300">{t(link.key)}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="hidden md:block text-slate-300 hover:text-teal-400 font-semibold transition-colors duration-300">
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
            <a href="#community" className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-full transition-colors duration-300">
              {t('nav_get_started')}
            </a>
            <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}>
        <nav className="flex flex-col items-center gap-6 p-8">
          {navLinks.map(link => (
            <a key={link.key} href={link.href} onClick={() => setIsOpen(false)} className="text-xl text-slate-200 hover:text-teal-400 transition-colors duration-300">{t(link.key)}</a>
          ))}
          <a href="#community" onClick={() => setIsOpen(false)} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 mt-4">
            {t('nav_get_started')}
          </a>
           <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="text-slate-300 hover:text-teal-400 font-semibold transition-colors duration-300 mt-4 text-lg">
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;