import { useEffect, useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import RunButton from './components/RunButton';
import OutputPanel from './components/OutputPanel';
import ExamplesPanel from './components/ExamplesPanel';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { runCode, CodeExecutionResult } from './utils/codeRunner';
import { DEFAULT_C_CODE } from './constants/defaultCode';

function App() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [code, setCode] = useState<string>(DEFAULT_C_CODE);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput('⚠️ Please enter some code to run.');
      setHasError(true);
      setShowOutput(true);
      return;
    }

    setIsRunning(true);
    setOutput('');
    setHasError(false);
    setShowOutput(true);

    try {
      const result: CodeExecutionResult = await runCode(code);

      const likelyHasError =
        result.hasError ||
        /error/i.test(result.output) ||
        /undefined/i.test(result.output) ||
        /main\.c:\d+:\d+/.test(result.output);

      setOutput(result.output);
      setHasError(likelyHasError);
    } catch {
      setOutput('🚨 An unexpected error occurred while running your code.');
      setHasError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setShowOutput(false);
    setOutput('');
    setHasError(false);
  };

  const toggleExamples = () => setShowExamples(!showExamples);

  // Auto run on Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-all duration-300 scrollbar-hide">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        showExamples={showExamples}
        toggleExamples={toggleExamples}
      />

      <main className="pt-14 sm:pt-16 pb-4 sm:pb-8">
        <div className="max-w-[2000px] mx-auto px-4 lg:px-6 xl:px-8 py-4">
          {/* Mobile/Tablet Layout */}
          <div className="block xl:hidden space-y-4">
            {showExamples && (
              <div className="rounded-xl shadow-lg border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden h-[50vh]">
                <ExamplesPanel
                  onLoadExample={handleLoadExample}
                  onRunCode={handleRunCode}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {/* Editor */}
            <div className="rounded-xl shadow-lg border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-slate-700/50 bg-gray-50/80 dark:bg-slate-800/80">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  C Editor
                </h2>
                <RunButton onClick={handleRunCode} isRunning={isRunning} disabled={!code.trim()} />
              </div>
              <div className={`${showExamples ? 'h-[35vh]' : 'h-[45vh]'} sm:h-[50vh]`}>
                <CodeEditor code={code} onChange={setCode} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Output */}
            <div className={`transition-all duration-500 ease-out transform ${showOutput ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-4 scale-95'}`}>
              <div className="rounded-xl shadow-lg border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                <OutputPanel output={output} isRunning={isRunning} hasError={hasError} />
              </div>
            </div>

            {/* Quick Tips */}
            {!showExamples && (
              <div className="rounded-xl p-4 border dark:border-blue-800/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  Quick Tips
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• Include stdio.h for I/O</li>
                  <li>• Use proper syntax</li>
                  <li>• Check compilation errors</li>
                  <li>• Use descriptive names</li>
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:grid xl:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
            {showExamples && (
              <div className="xl:col-span-3 rounded-2xl shadow-xl border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                <ExamplesPanel
                  onLoadExample={handleLoadExample}
                  onRunCode={handleRunCode}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            <div className={`${showExamples ? 'xl:col-span-6' : 'xl:col-span-8'} flex flex-col space-y-4`}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                  C Code Editor
                </h2>
                <RunButton onClick={handleRunCode} isRunning={isRunning} disabled={!code.trim()} />
              </div>

              <div className="flex-1 rounded-2xl shadow-xl border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                <CodeEditor code={code} onChange={setCode} isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className={`${showExamples ? 'xl:col-span-3' : 'xl:col-span-4'} flex flex-col space-y-4`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3" />
                Program Output
              </h2>

              <div className={`flex-1 transition-all duration-500 ease-out transform ${showOutput ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-4 scale-95'}`}>
                <div className="h-full rounded-2xl shadow-xl border dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                  <OutputPanel output={output} isRunning={isRunning} hasError={hasError} />
                </div>
              </div>

              {!showExamples && (
                <div className="rounded-2xl p-6 shadow-lg border dark:border-blue-800/50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 backdrop-blur-sm">
                  <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                    💡 Pro Tips
                  </h3>
                  <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
                    <li><span className="text-blue-500 mr-2">▸</span> Include `stdio.h` for printf/scanf</li>
                    <li><span className="text-blue-500 mr-2">▸</span> Always end lines with semicolons</li>
                    <li><span className="text-blue-500 mr-2">▸</span> Watch the output for compiler hints</li>
                    <li><span className="text-blue-500 mr-2">▸</span> Use meaningful variable names</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
