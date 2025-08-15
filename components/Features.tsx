import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { translations, TranslationKey } from '../constants/translations';
import { ZapIcon, CubeTransparentIcon, CircleStackIcon, ShieldCheckIcon } from './Icons';

const iconMap: { [key: string]: React.FC<{className?: string}> } = {
  'feature_1_title': ZapIcon,
  'feature_2_title': CubeTransparentIcon,
  'feature_3_title': CircleStackIcon,
  'feature_4_title': ShieldCheckIcon,
};


const Features: React.FC = () => {
  const { t } = useLocalization();
  const features = ['feature_1', 'feature_2', 'feature_3', 'feature_4'];

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        {t('features_main_title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((featureKey) => {
          const titleKey = `${featureKey}_title` as TranslationKey;
          const descriptionKey = `${featureKey}_description` as TranslationKey;
          const Icon = iconMap[titleKey];

          return (
            <div key={featureKey} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg glow-on-hover h-full flex flex-col">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 mb-6 border border-slate-700 flex-shrink-0">
                {Icon && <Icon className="h-8 w-8 text-teal-400" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t(titleKey)}</h3>
              <p className="text-slate-400 flex-grow">{t(descriptionKey)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;