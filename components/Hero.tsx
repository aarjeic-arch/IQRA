import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const Hero: React.FC = () => {
  const { t, language } = useLocalization();

  const codeSnippet = `
// مرحباً بك في لغة إقرأ
دالة اطبع_ترحيب(الاسم) {
  اطبع("أهلاً بك، " + الاسم + "!");
}

اطبع_ترحيب("يا عالم");
  `.trim();

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
        <div className="flex justify-center items-center gap-4">
          <a href="#community" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105">
            {t('hero_cta_button')}
          </a>
           <a href="#examples" className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-slate-200 font-bold py-3 px-8 rounded-full transition-colors duration-300">
            {t('hero_secondary_button')}
          </a>
        </div>
        
        <div dir="ltr" className="max-w-2xl mx-auto mt-16 bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-2xl shadow-teal-500/10 overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <pre className="p-6 text-left text-sm md:text-base overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  {codeSnippet}
                </code>
            </pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
