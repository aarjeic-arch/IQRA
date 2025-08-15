// A professional Iqra-to-JS transpiler and runner.

const createEnvironment = () => {
  const env = {
    output: [] as string[],
    
    // Built-in Iqra functions, exposed to the sandboxed code.
    'اطبع': (...args: any[]) => {
      const line = args.map(arg => {
        if (arg === null) return 'عدم';
        if (typeof arg === 'undefined') return 'غير معرف';
        if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
        return String(arg);
      }).join(' ');
      env.output.push(line);
    },
    'تأخير': (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

    // Standard Libraries
    'رياضيات': Math,
    'جسون': JSON,
    'تاريخ': Date,
  };
  return env;
};


let environment = createEnvironment();

const iqraToJs = (code: string): string => {
  const stringLiterals: string[] = [];
  const placeholder = "__IQRA_STRING_LITERAL__";

  // 1. Protect string literals and comments
  let protectedCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '') // Remove single-line comments
    .replace(/"(?:\\.|[^"\\])*"/g, (match) => {
      stringLiterals.push(match);
      return `"${placeholder}${stringLiterals.length - 1}"`;
    });

  const replacements: { [key: string]: string } = {
    'ثابت': 'const', 'متغير': 'let', 'اذا': 'if', 'والا اذا': 'else if',
    'والا': 'else', 'طالما': 'while', 'دالة': 'function', 
    'دالة_غير_متزامنة': 'async function', 'ارجع': 'return',
    'انتظر': 'await', 'حاول': 'try', 'امسك': 'catch',
    'صحيح': 'true', 'خطأ': 'false', 'عدم': 'null', 'و': '&&', 'أو': '||',
  };
  
  let jsCode = protectedCode;
  
  // 2. Transpile object literals - quote unquoted Arabic keys
  jsCode = jsCode.replace(/\{[^{}]+\}/g, (objectLiteral) => {
    return objectLiteral.replace(/([\u0600-\u06FF\w_]+)\s*:/g, '"$1":');
  });
  
  // 3. Transpile functional array methods and Arabic properties
  jsCode = jsCode.replace(/\.([\u0600-\u06FF\w_]+)/g, (match, p1) => {
      const methodMap: { [key: string]: string } = {
          'خريطة': '.map',
          'تصفية': '.filter',
          'تجميع': '.reduce'
      };
      return methodMap[p1] || `["${p1}"]`;
  });

  // 4. Apply simple keyword replacements
  for (const [iqra, js] of Object.entries(replacements)) {
      const regex = new RegExp(`(^|\\W)(${iqra})($|\\W)`, 'g');
      jsCode = jsCode.replace(regex, `$1${js}$3`);
  }
  
  // 5. Handle `كرر (n) مرات { ... }` loop
  jsCode = jsCode.replace(/كرر\s*\(([^)]+)\)\s*مرات\s*\{/g, `for (let العداد = 0; العداد < $1; العداد++) {`);

  // 6. Restore string literals
  jsCode = jsCode.replace(new RegExp(`"${placeholder}(\\d+)"`, 'g'), (match, index) => {
    return stringLiterals[parseInt(index, 10)];
  });

  return jsCode;
};

const parseErrorStack = (e: any): number | null => {
  if (!e.stack) return null;
  const match = e.stack.match(/<anonymous>:(\d+):(\d+)/);
  if (match && match[1]) {
    const lineNumber = parseInt(match[1], 10) - 2; // account for "use strict" and async wrapper
    return lineNumber > 0 ? lineNumber : null;
  }
  return null;
}

interface ExecutionResult {
  outputLines: string[];
  error: string | null;
  errorLine: number | null;
  executionTime: number;
}

export const executeIqraCode = async (code: string): Promise<ExecutionResult> => {
  environment = createEnvironment();
  let error: string | null = null;
  let errorLine: number | null = null;
  
  const startTime = performance.now();

  try {
    const jsCode = iqraToJs(code);
    
    const sandboxedExecutor = new Function('env', `
      with (env) {
        return (async () => {
          "use strict";
          ${jsCode}
        })();
      }
    `);
    
    await sandboxedExecutor(environment);

  } catch (e: any) {
    errorLine = parseErrorStack(e);
    let errorMessage = `خطأ في التنفيذ: ${e.message}`;
    if (e instanceof ReferenceError) {
      errorMessage = `خطأ مرجعي: المتغير أو الدالة '${e.message.split(' ')[0]}' غير معرفة.`;
    } else if (e instanceof SyntaxError) {
      errorMessage = `خطأ في بناء الجملة: تأكد من كتابة الكود بشكل صحيح. (${e.message})`;
    } else if (e instanceof TypeError) {
      errorMessage = `خطأ في النوع: لا يمكن تنفيذ العملية على قيمة من نوع غير صحيح. (${e.message})`;
    }
    error = errorMessage;
  }
  
  const endTime = performance.now();
  const executionTime = Math.round(endTime - startTime);

  return { outputLines: environment.output, error, errorLine, executionTime };
};