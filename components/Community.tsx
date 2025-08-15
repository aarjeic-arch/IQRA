import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { GithubIcon, DiscordIcon, TwitterIcon } from './Icons';

const Community: React.FC = () => {
  const { t } = useLocalization();
  
  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: '#' },
    { name: 'Discord', icon: DiscordIcon, href: '#' },
    { name: 'Twitter', icon: TwitterIcon, href: '#' }
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-10 md:p-16 text-center shadow-2xl shadow-teal-500/10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {t('community_title')}
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-10">
        {t('community_subtitle')}
      </p>
      <div className="flex justify-center items-center gap-4 md:gap-6">
        {socialLinks.map(link => {
          const Icon = link.icon;
          return (
            <a key={link.name} href={link.href} aria-label={`Join us on ${link.name}`}
               className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110">
              <Icon className="h-6 w-6 md:h-8 md:w-8" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
