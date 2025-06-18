export interface CodeExecutionResult {
  output: string;
  hasError: boolean;
  executionTime?: number;
}

/**
 * Instruments C code with logState calls to track variable values.
 */
const instrumentCCode = (code: string): string => {
  const baseAddress = 0x1000;  // starting address
  let addressCounter = 0;

  // logState now takes name, value, and address
  const logFn = `
#include <stdio.h>
void logState(const char* name, int value, unsigned int addr) {
    printf("👉 memory: { %s: %d } at 0x%X\\n", name, value, addr);
}
`;

  const lines = code.split('\n');
  const instrumented: string[] = [];

  // Map to assign addresses for variables
  const varAddresses: Record<string, number> = {};

  const varDeclInitRegex = /^\s*int\s+(\w+)\s*=\s*[^;]+;/;
  const varDeclNoInitRegex = /^\s*int\s+(\w+)\s*;/;
  const assignRegex = /^\s*(\w+)\s*=\s*[^;]+;/;
  const scanfRegex = /^\s*scanf\s*\(.*\);/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    instrumented.push(line);

    // Variable declaration with initialization
    let match = line.match(varDeclInitRegex);
    if (match) {
      const varName = match[1];
      if (!(varName in varAddresses)) {
        varAddresses[varName] = baseAddress + addressCounter * 4;
        addressCounter++;
      }
      instrumented.push(`logState("${varName}", ${varName}, ${varAddresses[varName]});`);
      continue;
    }

    // Variable declaration without initialization
    match = line.match(varDeclNoInitRegex);
    if (match) {
      const varName = match[1];
      if (!(varName in varAddresses)) {
        varAddresses[varName] = baseAddress + addressCounter * 4;
        addressCounter++;
      }
      // Do not log yet since no initial value assigned
      continue;
    }

    // Assignment
    match = line.match(assignRegex);
    if (match) {
      const varName = match[1];
      if (!(varName in varAddresses)) {
        varAddresses[varName] = baseAddress + addressCounter * 4;
        addressCounter++;
      }
      instrumented.push(`logState("${varName}", ${varName}, ${varAddresses[varName]});`);
      continue;
    }

    // scanf usage
    if (scanfRegex.test(line)) {
      const varMatch = line.match(/&(\w+)/);
      if (varMatch) {
        const varName = varMatch[1];
        if (!(varName in varAddresses)) {
          varAddresses[varName] = baseAddress + addressCounter * 4;
          addressCounter++;
        }
        instrumented.push(`logState("${varName}", ${varName}, ${varAddresses[varName]});`);
      }
    }
  }

  return logFn + '\n' + instrumented.join('\n');
};


export const runCode = async (code: string): Promise<CodeExecutionResult> => {
  try {
    const instrumentedCode = instrumentCCode(code); // Inject logging

    const response = await fetch('https://codebasse.onrender.com/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: instrumentedCode }), //  Send instrumented version
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
      hasError: data.hasError ?? false,
      executionTime: data.executionTime,
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
