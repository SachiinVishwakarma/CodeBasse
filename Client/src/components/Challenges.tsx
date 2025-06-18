import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CodeEditor from '../components/CodeEditor';
import RunButton from '../components/RunButton';
import { runCode } from '../utils/codeRunner';
import { useTheme } from '../hooks/useTheme';

const challenges = [
  {
    id: 1,
    title: 'Print Your Name',
    description: 'Write a C program that prints your name.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // your code here\n    return 0;\n}',
    expectedOutput: 'Sachin\n',
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    description: 'Write a program to add two numbers and print the result.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // your code here\n    return 0;\n}',
    expectedOutput: '30\n',
  },
  {
    id: 3,
    title: 'Print 1 to 10 using loop',
    description: 'Use a loop to print numbers from 1 to 10.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // your code here\n    return 0;\n}',
    expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n',
  },
];

export default function Challenges() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selected, setSelected] = useState(challenges[0]);
  const [code, setCode] = useState(selected.starterCode);
  const [output, setOutput] = useState('');
  const [result, setResult] = useState<null | 'pass' | 'fail'>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    const res = await runCode(code);
    setOutput(res.output.trim());
    setResult(res.output.trim() === selected.expectedOutput.trim() ? 'pass' : 'fail');
    setIsRunning(false);
  };

  const handleSelectChallenge = (c: typeof selected) => {
    setSelected(c);
    setCode(c.starterCode);
    setOutput('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-all duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🧪 Code Playground Challenges</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            {challenges.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectChallenge(c)}
                className={`w-full text-left p-4 rounded-xl border shadow ${
                  selected.id === c.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                } hover:bg-blue-50 dark:hover:bg-blue-800/40`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{c.description}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-xl border shadow bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <div className="px-4 py-3 border-b dark:border-slate-700 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  {selected.title}
                </h2>
                <RunButton onClick={handleRun} isRunning={isRunning} />
              </div>
              <CodeEditor code={code} onChange={setCode} isDarkMode={isDarkMode} />
            </div>

            <div className="rounded-xl border shadow p-4 bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm">
              <h3 className="text-md font-bold text-gray-800 dark:text-white mb-2">Output:</h3>
              <pre className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{output || 'No output yet'}</pre>
              {result === 'pass' && (
                <p className="mt-2 text-green-600 dark:text-green-400 font-semibold">✅ Challenge Passed!</p>
              )}
              {result === 'fail' && (
                <p className="mt-2 text-red-600 dark:text-red-400 font-semibold">❌ Try Again! Expected output doesn’t match.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
