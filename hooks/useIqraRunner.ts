import { useState, useCallback } from 'react';
import { executeIqraCode } from '../core/interpreter';

interface ExecutionError {
  message: string;
  line: number | null;
}

export const useIqraRunner = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<ExecutionError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const runCode = useCallback(async (code: string) => {
    setIsLoading(true);
    setOutput([]);
    setError(null);
    setExecutionTime(null);

    const result = await executeIqraCode(code);
    
    setOutput(result.outputLines);
    setExecutionTime(result.executionTime);

    if (result.error) {
      setError({ message: result.error, line: result.errorLine });
    }
    setIsLoading(false);
  }, []);
  
  return { output, error, isLoading, executionTime, runCode };
};