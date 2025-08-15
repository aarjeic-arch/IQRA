import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { useIqraRunner } from '../hooks/useIqraRunner';
import { PlayIcon, SpinnerIcon, XCircleIcon, TrashIcon, ClipboardCopyIcon, CheckIcon, ArrowPathIcon } from './Icons';

const initialCode = `// استكشف هياكل البيانات الجديدة في إقرأ!

// تعريف كائن يمثل طالباً
ثابت طالب = {
  الاسم: "أحمد",
  العمر: 22,
  المواد: ["رياضيات", "فيزياء", "برمجة"]
};

// تعريف مصفوفة من الأرقام
متغير درجات = [95, 88, 100];

// إضافة درجة جديدة باستخدام دالة 'دفع' المدمجة
دفع(درجات, 92);

اطبع("--- معلومات الطالب ---");
اطبع("الاسم: " + طالب.الاسم);
اطبع("العمر: " + طالب.العمر);
اطبع("المادة الأولى: " + طالب.المواد[0]);
اطبع("عدد المواد: " + طول(طالب.المواد));

اطبع("\\n--- درجات الطالب ---");
اطبع("الدرجات بعد الإضافة: " + ربط(درجات, ", "));

// دالة لحساب المتوسط
دالة حساب_المتوسط(مصفوفة_الدرجات) {
  متغير المجموع = 0;
  كرر (طول(مصفوفة_الدرجات)) مرات {
    المجموع = المجموع + مصفوفة_الدرجات[العداد];
  }
  ارجع المجموع / طول(مصفوفة_الدرجات);
}

ثابت المتوسط = حساب_المتوسط(درجات);
اطبع("متوسط الدرجات: " + تقريب(المتوسط));
`;

// Simple syntax highlighting function
const highlightCode = (code: string) => {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/.+)/g, '<span class="token-comment">$1</span>')
    .replace(/\b(ثابت|متغير|دالة|ارجع|اذا|والا|والا اذا|طالما|كرر|مرات)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/\b(صحيح|خطأ|عدم)\b/g, '<span class="token-boolean">$1</span>')
    .replace(/\b(اطبع|جذر|تقريب|رقم_عشوائي|طول|قص|استبدل|الى_حروف_كبيرة|الى_حروف_صغيرة|دفع|فرقعة|ربط|نوع|هل_هو_رقم|هل_هو_نص)\b/g, '<span class="token-function">$1</span>')
    .replace(/(".*?")/g, '<span class="token-string">$1</span>')
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>')
    .replace(/([+\-*/=<>!]+|و|أو)/g, '<span class="token-operator">$1</span>')
    .replace(/([,;(){}[\]])/g, '<span class="token-punctuation">$1</span>');
};

const Playground: React.FC = () => {
  const { t } = useLocalization();
  const [code, setCode] = useState(initialCode.trim());
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const { output, error, isLoading, runCode, clearOutput } = useIqraRunner();

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Auto-resize editor height
  useEffect(() => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);

  // Update syntax highlighting
  useEffect(() => {
    setHighlightedCode(highlightCode(code));
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };
  
  // Sync scroll between textarea, pre, and line numbers
  const syncScroll = useCallback(() => {
    const editor = editorRef.current;
    const pre = preRef.current;
    const lineNumbers = lineNumbersRef.current;
    if (editor && pre && lineNumbers) {
      pre.scrollTop = editor.scrollTop;
      pre.scrollLeft = editor.scrollLeft;
      lineNumbers.scrollTop = editor.scrollTop;
    }
  }, []);

  const handleExecute = () => runCode(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleReset = () => {
    setCode(initialCode.trim());
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('playground_title')}</h2>
      <p className="text-slate-400 max-w-3xl mx-auto mb-12">{t('playground_subtitle')}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {/* Editor Panel */}
        <div className="flex flex-col">
          {/* Editor Header */}
          <div className="flex justify-between items-center gap-4 bg-slate-800 p-2 rounded-t-xl border border-b-0 border-slate-700">
            <div className="flex items-center gap-2">
               <button onClick={handleReset} title={t('playground_reset_button')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-700">
                 <ArrowPathIcon className="h-5 w-5" />
               </button>
                <div className="relative">
                   <button onClick={handleCopy} title={t('playground_copy_button')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-700">
                     <ClipboardCopyIcon className="h-5 w-5" />
                   </button>
                    <div role="status" aria-live="polite" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md transition-all duration-300 ${isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ pointerEvents: 'none' }}>
                      <CheckIcon className="h-4 w-4" />
                      {t('playground_copied_button')}
                    </div>
                </div>
            </div>
            <button onClick={handleExecute} disabled={isLoading} className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              {isLoading ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : <PlayIcon className="h-5 w-5" />}
              <span>{t('playground_execute_button')}</span>
            </button>
          </div>
          
          <div className="flex-grow bg-[#1e293b] rounded-b-xl shadow-2xl shadow-teal-500/10 border border-t-0 border-slate-700 overflow-hidden flex dir-ltr live-editor-container">
             <div ref={lineNumbersRef} className="bg-slate-900 text-slate-500 text-right p-4 font-mono text-sm select-none overflow-y-hidden">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="relative w-full live-editor-wrapper">
              <pre className="live-editor-pre" aria-hidden="true">
                <code ref={preRef} dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }} />
              </pre>
              <textarea
                ref={editorRef}
                value={code}
                onChange={handleCodeChange}
                onScroll={syncScroll}
                className="live-editor-textarea"
                spellCheck="false"
                dir="ltr"
                aria-label="Code Editor"
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="bg-slate-800 px-4 py-3 rounded-t-xl border-b border-slate-600 flex justify-between items-center">
            <h3 className="font-bold text-white">{t('playground_output_header')}</h3>
            <button onClick={clearOutput} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <TrashIcon className="h-4 w-4" />
              {t('playground_clear_button')}
            </button>
          </div>
          <div className="flex-grow bg-black text-white p-4 font-mono text-sm rounded-b-xl overflow-auto" style={{minHeight: '400px'}}>
            <pre className="whitespace-pre-wrap">
              {isLoading 
                ? <span className="text-slate-400 animate-pulse">{t('playground_executing')}</span>
                : <>
                    {output.map((line, i) => (
                      <div key={`out-${i}`} className="flex">
                        <span className="text-slate-600 mr-3 select-none">{'>'}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                    {error && (
                      <div className="mt-4 p-3 bg-red-900/50 border-l-4 border-red-500 rounded">
                        <div className="flex items-center gap-2 font-bold text-red-400 mb-2">
                          <XCircleIcon className="h-5 w-5" />
                          <span>{t('playground_error_header')}</span>
                        </div>
                        {error.line && (
                          <p className="text-red-400 font-semibold">{t('playground_error_on_line', {lineNumber: error.line.toString()})}</p>
                        )}
                        <p className="text-red-300">{error.message}</p>
                      </div>
                    )}
                  </>
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;