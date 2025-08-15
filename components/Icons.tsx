import React from 'react';

export const IqraLogo: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const MenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0112 15.75c-2.071 0-3.75-1.679-3.75-3.75S9.929 8.25 12 8.25s3.75 1.679 3.75 3.75m-7.5 3.75h7.5m-7.5 3.75a3.375 3.375 0 01-3.375-3.375V6.75a3.375 3.375 0 013.375-3.375h1.5a3.375 3.375 0 013.375 3.375v1.5m-7.5 0h7.5" />
  </svg>
);

export const ZapIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const GlobeAltIcon: React.FC<{ className?: string }> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);


export const ClipboardCopyIcon: React.FC<{ className?: string }> = (props) => (
    <svg {...props} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = (props) => (
    <svg {...props} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

// Social Icons
export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

export const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.3698C18.699 3.5048 16.92 2.9248 15.062 2.6548C15.037 2.7638 15.013 2.8738 14.987 2.9858C13.593 2.7578 12.164 2.6518 10.704 2.6518C9.245 2.6518 7.816 2.7578 6.422 2.9858C6.397 2.8738 6.373 2.7638 6.348 2.6548C4.49 2.9248 2.713 3.5048 1.095 4.3698C0.315 7.8598 -0.059 11.2328 0.003 14.5918C0.511 18.0498 2.731 20.6698 5.727 21.6038C6.353 21.8158 6.99 21.9388 7.621 22.0008C7.633 21.8898 7.645 21.7768 7.658 21.6648C6.03 21.0338 4.793 19.9178 3.999 18.4238C4.542 18.6838 5.106 18.9098 5.69 19.0968C5.748 19.0818 5.804 19.0668 5.86 19.0498C7.218 19.5598 8.653 19.8998 10.154 20.0638C10.258 19.9178 10.36 19.7708 10.458 19.6208C10.003 19.5448 9.556 19.4528 9.118 19.3458C9.072 19.3308 9.028 19.3148 8.982 19.2988C6.549 18.1518 5.213 15.8568 5.105 13.3448C5.074 13.1388 5.074 12.9308 5.074 12.7238C5.702 12.0048 6.436 11.3918 7.243 10.8588C7.231 10.9708 7.219 11.0828 7.207 11.1948C6.606 12.2408 6.208 13.4318 6.208 14.7218C6.208 14.7798 6.209 14.8388 6.211 14.8968C8.525 14.3328 10.228 12.6078 10.584 10.5138C9.537 9.8458 8.524 9.2408 7.575 8.7058C7.575 8.6758 7.575 8.6468 7.575 8.6168C7.575 7.8438 7.815 7.1088 8.243 6.4868C9.333 5.5688 10.669 5.2428 12.016 5.2428C13.363 5.2428 14.699 5.5688 15.789 6.4868C16.217 7.1088 16.457 7.8438 16.457 8.6168C16.457 8.6468 16.457 8.6758 16.457 8.7058C15.508 9.2408 14.495 9.8458 13.448 10.5138C13.804 12.6078 15.507 14.3328 17.821 14.8968C17.823 14.8388 17.824 14.7798 17.824 14.7218C17.824 13.4318 17.426 12.2408 16.825 11.1948C16.813 11.0828 16.801 10.9708 16.789 10.8588C17.596 11.3918 18.33 12.0048 18.958 12.7238C18.958 12.9308 18.958 13.1388 18.927 13.3448C18.819 15.8568 17.483 18.1518 15.05 19.2988C14.993 19.3218 14.936 19.3458 14.878 19.3698C14.44 19.4678 13.993 19.5598 13.538 19.6208C13.636 19.7708 13.738 19.9178 13.842 20.0638C15.343 19.8998 16.778 19.5598 18.136 19.0498C18.192 19.0668 18.248 19.0818 18.306 19.0968C18.89 18.9098 19.454 18.6838 19.997 18.4238C19.203 19.9178 17.966 21.0338 16.338 21.6648C16.351 21.7768 16.363 21.8898 16.375 22.0008C17.006 21.9388 17.643 21.8158 18.269 21.6038C21.265 20.6698 23.485 18.0498 23.993 14.5918C24.055 11.2328 23.681 7.8598 22.901 4.3698L20.317 4.3698Z"/>
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.14.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.22 4.16 1.93 6.56 1.93 7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
    </svg>
);

// New Avatar Icon
export const UserAvatarIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const colors = ["#2dd4bf", "#38bdf8", "#a78bfa", "#f471b5", "#fb923c"];
  
  const getHashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const getColor = (str: string) => colors[Math.abs(getHashCode(str)) % colors.length];

  const color = getColor(name);

  return (
    <div className={`flex-shrink-0 flex items-center justify-center border-2 border-slate-700 ${className}`} style={{ backgroundColor: '#1e293b' }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
         <defs>
          <pattern id={`pattern-${name}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform={`rotate(${getHashCode(name) % 45})`}>
            <circle cx="10" cy="10" r="5" fill={color} fillOpacity="0.7"/>
          </pattern>
        </defs>
        <circle cx="50" cy="50" r="48" fill={`url(#pattern-${name})`} />
        <circle cx="50" cy="50" r="48" fill="transparent" stroke={color} strokeWidth="3" />
      </svg>
    </div>
  );
};