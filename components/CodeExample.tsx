import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { ClipboardCopyIcon, CheckIcon } from './Icons';

// A more robust highlighting function
const highlightCode = (code: string) => {
  return code
    .replace(/(\/\/.+)/g, '<span class="token-comment">$1</span>')
    .replace(/\b(ثابت|متغير|دالة|ارجع|اطبع)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/(\w+)(?=\()/g, '<span class="token-function">$1</span>')
    .replace(/(".*?")/g, '<span class="token-string">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
};


const CodeExample: React.FC = () => {
  const { t } = useLocalization();
  const [isCopied, setIsCopied] = useState(false);

  const codeSnippet = `
// حساب مساحة المستطيل
ثابت الطول = 10;
ثابت العرض = 5;

دالة حساب_المساحة(طول، عرض) {
  ارجع طول * عرض;
}

متغير المساحة = حساب_المساحة(الطول، العرض);

اطبع("مساحة المستطيل هي: " + المساحة);
// الناتج: مساحة المستطيل هي: 50
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('code_example_title')}</h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-12">{t('code_example_subtitle')}</p>
      
      <div dir="ltr" className="max-w-3xl mx-auto bg-slate-900 rounded-xl shadow-2xl shadow-teal-500/10 border border-slate-700">
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between rounded-t-xl">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="relative">
            <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
              <ClipboardCopyIcon />
              {t('code_example_copy')}
            </button>
            <div
              role="status"
              aria-live="polite"
              className={`absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-2 bg-green-500 text-white font-bold px-3 py-1 rounded-md transition-all duration-300 ${isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ pointerEvents: 'none' }}
            >
              <CheckIcon />
              {t('code_example_copied')}
            </div>
          </div>
        </div>
        <pre className="p-6 text-left text-sm md:text-base overflow-x-auto">
          <code 
            className="text-slate-300 font-mono whitespace-pre-wrap" 
            dangerouslySetInnerHTML={{ __html: highlightCode(codeSnippet) }} 
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeExample;