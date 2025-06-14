import React from 'react';
import { Code2, Moon, Sun, BookOpen, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showExamples: boolean;
  toggleExamples: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, showExamples, toggleExamples }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 shadow-lg">
      <div className="max-w-[2000px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 h-12 sm:h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              CodeBase
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
              C Basic Programming IDE
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Examples Toggle Button */}
          <button
            onClick={toggleExamples}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 backdrop-blur-sm ${showExamples
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            aria-label="Toggle examples panel"
          >
            {showExamples ? (
              <>
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Close</span>
              </>
            ) : (
              <>
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Examples</span>
              </>
            )}
          </button>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 rounded-full border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Online</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-100/80 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 backdrop-blur-sm"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;