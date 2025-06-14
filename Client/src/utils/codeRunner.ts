export interface CodeExecutionResult {
  output: string;
  hasError: boolean;
}

export const runCode = async (code: string): Promise<CodeExecutionResult> => {
  try {
    const response = await fetch('https://codebasse.onrender.com/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok || !data || !('output' in data)) {
      return {
        output: data?.error || 'Failed to execute code or invalid server response.',
        hasError: true,
      };
    }

    return {
      output: data.output || 'Code executed successfully with no output.',
      hasError: false,
    };
  } catch (error) {
    return {
      output: `Network error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      hasError: true,
    };
  }
};
