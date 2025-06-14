import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
  hasError: boolean;
  errors?: { message: string; line?: number; column?: number }[];
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, isRunning, hasError, errors }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200/50 dark:border-slate-700/50 bg-gray-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <Terminal className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400 mr-2" />
        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Console Output</span>
        <div className="ml-auto flex items-center space-x-2">
          {isRunning && (
            <div className="flex items-center space-x-1">
              <Activity className="h-3 w-3 text-blue-500 animate-pulse" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Running</span>
            </div>
          )}
          {hasError && !isRunning && (
            <div className="flex items-center space-x-1">
              <AlertCircle className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">Error</span>
            </div>
          )}
          {!hasError && output && !isRunning && (
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Success</span>
            </div>
          )}
        </div>
      </div>

      {/* Output Body */}
      <div className="flex-1 p-3 sm:p-4 overflow-auto min-h-[120px] max-h-[40vh] xl:max-h-none">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3">
            <div className="relative">
              <div className="animate-spin h-8 w-8 border-3 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"></div>
              <div className="absolute inset-0 animate-ping h-8 w-8 border-2 border-blue-400 dark:border-blue-300 border-t-transparent rounded-full opacity-20"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Compiling & Running</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Please wait...</p>
            </div>
          </div>
        ) : hasError && errors?.length ? (
          <div className="space-y-2 text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm">
            {errors.map((err, idx) => (
              <div key={idx} className="border-l-4 border-red-500 pl-3">
                {err.line != null && <strong>Line {err.line}:</strong>} {err.message}
              </div>
            ))}
            <pre className="mt-2 whitespace-pre-wrap">{output}</pre>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed">
              {output.split('\n').map((line, idx) => {
                const isErrorLine = /main\.c:\d+:\d+/.test(line) || /error/i.test(line);
                return (
                  <div
                    key={idx}
                    className={`${isErrorLine
                        ? 'text-red-600 dark:text-red-400 font-semibold'
                        : 'text-gray-800 dark:text-gray-200'
                      }`}
                  >
                    {line}
                  </div>
                );
              })}
            </pre>

            {/* Show only if there's NO error */}
            {!hasError && (
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200/50 dark:border-slate-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Execution completed successfully
                </span>
              </div>
            )}

            {/* Show if there is an error */}
            {hasError && (
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200/50 dark:border-slate-700/50">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Execution failed due to errors
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-full">
              <Terminal className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready to run</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Output will appear here when you execute your code
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
