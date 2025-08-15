import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const Hero: React.FC = () => {
  const { t, language } = useLocalization();

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 text-center bg-grid-pattern">
       <div className="absolute inset-0 bg-gradient-to-b from-[#0A101F] via-[#0A101F]/80 to-[#0A101F]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          style={{ textShadow: '0 2px 10px rgba(0, 255, 255, 0.3)' }}>
          {t('hero_title_part1')}<span className="text-teal-400">{t('hero_title_part2')}</span>{t('hero_title_part3')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10">
          {t('hero_subtitle')}
        </p>
        <div className="flex justify-center items-center gap-4 mt-16">
          <a href="#community" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 glow-on-hover">
            {t('hero_cta_button')}
          </a>
           <a href="#playground" className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-slate-200 font-bold py-3 px-8 rounded-full transition-colors duration-300">
            {t('hero_secondary_button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;