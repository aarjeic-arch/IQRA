// A simple Iqra-to-JS transpiler and runner.

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
    // Math
    'جذر': Math.sqrt,
    'تقريب': Math.round,
    'رقم_عشوائي': Math.random,
    // String/Array
    'طول': (val: string | any[]) => {
      if(val === undefined || val === null) return 0;
      return val.length;
    },
    'قص': (str: string, start: number, end?: number) => str.slice(start, end),
    'استبدل': (str: string, search: string, replacement: string) => str.replace(search, replacement),
    'الى_حروف_كبيرة': (str: string) => str.toUpperCase(),
    'الى_حروف_صغيرة': (str: string) => str.toLowerCase(),
    // Array
    'دفع': (arr: any[], ...elements: any[]) => arr.push(...elements),
    'فرقعة': (arr: any[]) => arr.pop(),
    'ربط': (arr: any[], separator = ',') => arr.join(separator),
    // Type checking
    'نوع': (val: any) => {
        const type = typeof val;
        const typeMap: {[key:string]: string} = {
            'string': 'نص',
            'number': 'رقم',
            'boolean': 'منطقي',
            'object': 'كائن',
            'undefined': 'غير معرف',
            'function': 'دالة'
        }
        if (val === null) return 'عدم';
        if (Array.isArray(val)) return 'مصفوفة';
        return typeMap[type] || type;
    },
    'هل_هو_رقم': (val: any) => typeof val === 'number' && !isNaN(val),
    'هل_هو_نص': (val: any) => typeof val === 'string',
  };
  return env;
};


let environment = createEnvironment();

const iqraToJs = (code: string): string => {
  const stringLiterals: string[] = [];
  const placeholder = "__IQRA_STRING_LITERAL__";

  // 1. Protect string literals
  let protectedCode = code.replace(/"(?:\\.|[^"\\])*"/g, (match) => {
    stringLiterals.push(match);
    return `"${placeholder}${stringLiterals.length - 1}"`;
  });

  const replacements: { [key: string]: string } = {
    'ثابت': 'const', 'متغير': 'let', 'اذا': 'if', 'والا اذا': 'else if',
    'والا': 'else', 'طالما': 'while', 'دالة': 'function', 'ارجع': 'return',
    'صحيح': 'true', 'خطأ': 'false', 'عدم': 'null', 'و': '&&', 'أو': '||',
  };
  
  let jsCode = protectedCode;
  
  // 2. Transpile object literals - quote unquoted Arabic keys
  jsCode = jsCode.replace(/\{[^{}]+\}/g, (objectLiteral) => {
    return objectLiteral.replace(/([\u0600-\u06FF\w_]+)\s*:/g, '"$1":');
  });

  // 3. Transpile dot notation for Arabic properties to bracket notation
  jsCode = jsCode.replace(/\.([\u0600-\u06FF\w_]+)/g, '["$1"]');


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

// A helper to parse line numbers from error stacks
const parseErrorStack = (e: any): number | null => {
  if (!e.stack) return null;
  // Try to find a line number in the stack trace
  const match = e.stack.match(/<anonymous>:(\d+):(\d+)/);
  if (match && match[1]) {
    // The line number inside the sandboxed function.
    // We subtract 1 to account for the "use strict"; line.
    const lineNumber = parseInt(match[1], 10) - 1;
    return lineNumber > 0 ? lineNumber : null;
  }
  return null;
}

interface ExecutionResult {
  outputLines: string[];
  error: string | null;
  errorLine: number | null;
}

export const executeIqraCode = async (code: string): Promise<ExecutionResult> => {
  environment = createEnvironment();
  let error: string | null = null;
  let errorLine: number | null = null;
  
  try {
    const jsCode = iqraToJs(code);
    
    // Using new Function in this controlled way is safer than direct eval().
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
      errorMessage = `خطأ مرجعي: المتغير أو الدالة '${e.message.split(' ')[0]}' غير معرفة. هل نسيت تعريفها باستخدام 'متغير' أو 'ثابت' أو قمت بخطأ إملائي؟`;
    } else if (e instanceof SyntaxError) {
      errorMessage = `خطأ في بناء الجملة: تأكد من كتابة الكود بشكل صحيح. (${e.message})`;
    } else if (e instanceof TypeError) {
      errorMessage = `خطأ في النوع: لا يمكن تنفيذ العملية على قيمة من نوع غير صحيح. (${e.message})`;
    }
    error = errorMessage;
  }

  return { outputLines: environment.output, error, errorLine };
};