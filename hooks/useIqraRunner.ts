import { useState, useCallback } from 'react';
import { executeIqraCode } from '../core/interpreter';
import { useLocalization } from '../context/LocalizationContext';

interface ExecutionError {
  message: string;
  line: number | null;
}

export const useIqraRunner = () => {
  const { t } = useLocalization();
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<ExecutionError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runCode = useCallback(async (code: string) => {
    setIsLoading(true);
    setOutput([]);
    setError(null);
    const result = await executeIqraCode(code);
    
    if (result.outputLines.length > 0) {
      setOutput(result.outputLines);
    } else if (!result.error) {
      setOutput([t('playground_no_output')]);
    }

    if (result.error) {
      setError({ message: result.error, line: result.errorLine });
    }
    setIsLoading(false);
  }, [t]);
  
  const clearOutput = useCallback(() => {
    setOutput([]);
    setError(null);
  }, []);

  return { output, error, isLoading, runCode, clearOutput };
};