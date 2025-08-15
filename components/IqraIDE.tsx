import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { useIqraRunner } from '../hooks/useIqraRunner';
import { PlayIcon, SpinnerIcon, XCircleIcon, ClipboardCopyIcon, CheckIcon, ArrowPathIcon, CodeBracketIcon, CommandLineIcon } from './Icons';

const initialCode = `/*
  مرحباً بك في بيئة تطوير إقرأ المتكاملة!
  هذا المثال يوضح القدرات المتقدمة للغة.
*/

// برمجة غير متزامنة لجلب بيانات وهمية
دالة_غير_متزامنة جلب_بيانات_المستخدم() {
  اطبع("... جاري جلب بيانات المستخدم");
  انتظر تأخير(1000); // محاكاة لطلب شبكي
  
  // استخدام كتلة "حاول/امسك" لمعالجة الأخطاء
  حاول {
    // خطأ محتمل: جسون.تحليل قد يفشل
    متغير بيانات_خام = '{"الاسم": "نورة", "العمر": 28, "الدرجات": [90, 85, 95]}';
    ارجع جسون.تحليل(بيانات_خام);
  } امسك (خطأ) {
    اطبع("حدث خطأ أثناء تحليل البيانات:" + خطأ);
    ارجع عدم;
  }
}

// دالة رئيسية لتشغيل البرنامج
دالة_غير_متزامنة رئيسية() {
  ثابت مستخدم = انتظر جلب_بيانات_المستخدم();

  اذا (مستخدم == عدم) {
    اطبع("فشل تحميل المستخدم.");
    ارجع;
  }
  
  اطبع("تم جلب المستخدم: " + مستخدم.الاسم);

  // استخدام البرمجة الوظيفية لمعالجة المصفوفات
  ثابت درجات_ممتازة = مستخدم.الدرجات
    .تصفية(درجة => درجة >= 90)
    .خريطة(درجة => "درجة ممتازة: " + درجة);

  اطبع("\\n--- الدرجات الممتازة ---");
  اطبع(درجات_ممتازة);
  
  ثابت مجموع_الدرجات = مستخدم.الدرجات.تجميع((مجموع, حالي) => مجموع + حالي, 0);
  اطبع("المعدل: " + (مجموع_الدرجات / مستخدم.الدرجات.length));

  اطبع("\\n--- استخدام مكتبة الرياضيات ---");
  اطبع("أكبر درجة هي: " + رياضيات.اكبر(...مستخدم.الدرجات));
}

// بدء تنفيذ البرنامج
رئيسية();
`.trim();

const highlightCode = (code: string): string => {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\b(ثابت|متغير|دالة|ارجع|اذا|والا|والا اذا|طالما|كرر|مرات|دالة_غير_متزامنة|انتظر|حاول|امسك)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/\b(صحيح|خطأ|عدم)\b/g, '<span class="token-boolean">$1</span>')
    .replace(/\b(اطبع|تأخير)\b/g, '<span class="token-function">$1</span>')
    .replace(/\b(رياضيات|جسون|تاريخ|طول)\b/g, '<span class="token-class-name">$1</span>')
    .replace(/(\.خريطة|\.تصفية|\.تجميع|\.length)\b/g, '<span class="token-function">$1</span>')
    .replace(/(".*?")/g, '<span class="token-string">$1</span>')
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>')
    .replace(/([+\-*/=<>!]+|و|أو)/g, '<span class="token-operator">$1</span>')
    .replace(/([,;(){}[\]])/g, '<span class="token-punctuation">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/|\/\/.+)/g, '<span class="token-comment">$1</span>');
};

const IqraIDE: React.FC = () => {
  const { t } = useLocalization();
  const [code, setCode] = useState(initialCode);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [editorWidth, setEditorWidth] = useState<number | null>(null);

  const { output, error, isLoading, executionTime, runCode } = useIqraRunner();

  const ideRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    setEditorWidth(ideRef.current ? ideRef.current.offsetWidth / 2 : null);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current && ideRef.current) {
      const rect = ideRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      if (newWidth > 200 && newWidth < rect.width - 200) {
        setEditorWidth(newWidth);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const syncScroll = useCallback(() => {
    const editor = editorRef.current;
    const pre = preRef.current;
    if (editor && pre) {
      pre.scrollTop = editor.scrollTop;
      pre.scrollLeft = editor.scrollLeft;
    }
  }, []);

  const handleExecute = () => {
    runCode(code);
    setActiveTab('output');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleReset = () => {
    setCode(initialCode);
  };

  const StatusDisplay: React.FC = () => {
    if (isLoading) {
      return <span className="text-sky-400">{t('status_executing')}</span>;
    }
    if (error) {
      return <span className="text-red-400">{t('status_error')}</span>;
    }
    if (executionTime !== null) {
      return <span className="text-green-400">{t('status_success', {time: executionTime.toString()})}</span>;
    }
    return <span className="text-slate-400">جاهز</span>;
  };
  
  const editorPanel = (
    <div className="relative w-full h-full ide-editor-wrapper">
      <pre className="ide-editor-pre" aria-hidden="true">
        <code ref={preRef} dangerouslySetInnerHTML={{ __html: highlightCode(code) + '\n' }} />
      </pre>
      <textarea
        ref={editorRef}
        value={code}
        onChange={handleCodeChange}
        onScroll={syncScroll}
        className="ide-editor-textarea"
        spellCheck="false"
        dir="ltr"
        aria-label="Code Editor"
      />
    </div>
  );

  const outputPanel = (
    <div className="flex-grow bg-black text-white p-4 font-mono text-sm overflow-auto h-full">
      <pre className="whitespace-pre-wrap">
        {isLoading && output.length === 0 && <span className="text-slate-400 animate-pulse">{t('status_executing')}</span>}
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
              <span>{error.line ? t('ide_error_at_line', {lineNumber: error.line.toString()}) : t('status_error')}</span>
            </div>
            <p className="text-red-300">{error.message}</p>
          </div>
        )}
      </pre>
    </div>
  );

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ide_title')}</h2>
      <p className="text-slate-400 max-w-3xl mx-auto mb-12">{t('ide_subtitle')}</p>
      
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl shadow-2xl shadow-teal-500/10 text-left flex flex-col min-h-[600px] h-[70vh] max-h-[800px]">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 bg-slate-800 p-2 rounded-t-xl border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
             <button onClick={handleReset} title={t('ide_reset_button')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-700">
               <ArrowPathIcon className="h-5 w-5" />
             </button>
              <div className="relative">
                 <button onClick={handleCopy} title={t('ide_copy_button')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-700">
                   <ClipboardCopyIcon className="h-5 w-5" />
                 </button>
                  <div role="status" aria-live="polite" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md transition-all duration-300 ${isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ pointerEvents: 'none' }}>
                    <CheckIcon className="h-4 w-4" />
                    {t('ide_copied_button')}
                  </div>
              </div>
          </div>
          <button onClick={handleExecute} disabled={isLoading} className="flex items-center justify-center gap-2 w-32 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
            {isLoading ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : <PlayIcon className="h-5 w-5" />}
            <span>{t('ide_execute_button')}</span>
          </button>
        </div>
        
        {/* Mobile Tabs */}
        <div className="md:hidden flex-shrink-0 border-b border-slate-700 bg-slate-800">
           <div className="flex">
                <button onClick={() => setActiveTab('code')} className={`flex-1 p-3 font-semibold flex items-center justify-center gap-2 ${activeTab === 'code' ? 'bg-slate-900/50 text-white' : 'text-slate-400'}`}>
                    <CodeBracketIcon className="h-5 w-5" /> {t('ide_tab_code')}
                </button>
                <button onClick={() => setActiveTab('output')} className={`flex-1 p-3 font-semibold flex items-center justify-center gap-2 ${activeTab === 'output' ? 'bg-black text-white' : 'text-slate-400'}`}>
                    <CommandLineIcon className="h-5 w-5" /> {t('ide_tab_output')}
                </button>
           </div>
        </div>
        
        {/* Main Content (Desktop) */}
        <div ref={ideRef} className="hidden md:flex flex-grow overflow-hidden">
          <div style={{ width: editorWidth ? `${editorWidth}px` : '50%' }} className="h-full ide-editor-container bg-[#1e293b]">
            {editorPanel}
          </div>
          <div onMouseDown={handleMouseDown} className="resize-handle flex-shrink-0"></div>
          <div className="flex-1 h-full">
            {outputPanel}
          </div>
        </div>

        {/* Main Content (Mobile) */}
        <div className="md:hidden flex-grow overflow-hidden">
            <div className={`h-full ${activeTab === 'code' ? 'block' : 'hidden'}`}>{editorPanel}</div>
            <div className={`h-full ${activeTab === 'output' ? 'block' : 'hidden'}`}>{outputPanel}</div>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-800 px-4 py-1.5 border-t border-slate-700 text-xs text-slate-400 flex-shrink-0">
            <StatusDisplay />
        </div>
      </div>
    </div>
  );
};

export default IqraIDE;