import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../constants/translations';
import { UserAvatarIcon } from './Icons';

const Testimonials: React.FC = () => {
  const { t } = useLocalization();
  const testimonials = ['testimonial_1', 'testimonial_2', 'testimonial_3'];

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        {t('testimonials_main_title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((key) => {
          const nameKey = `${key}_name` as TranslationKey;
          const roleKey = `${key}_role` as TranslationKey;
          const quoteKey = `${key}_quote` as TranslationKey;
          
          return (
            <div key={key} className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 flex flex-col items-start shadow-lg">
              <p className="text-slate-300 mb-6 flex-grow">"{t(quoteKey)}"</p>
              <div className="flex items-center">
                <UserAvatarIcon name={t(nameKey)} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold text-white">{t(nameKey)}</h4>
                  <p className="text-slate-400 text-sm">{t(roleKey)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;