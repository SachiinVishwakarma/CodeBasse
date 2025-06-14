import React from 'react';
import { Play, Square, Zap, ChevronRight, Code2 } from 'lucide-react';

interface RunButtonProps {
  onClick: () => void;
  isRunning: boolean;
  disabled?: boolean;
}

const RunButton: React.FC<RunButtonProps> = ({ onClick, isRunning, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isRunning}
      className={`
        relative group flex items-center justify-center px-4 py-1
        bg-gradient-to-br from-slate-800 via-slate-900 to-black
        border border-slate-600/50 rounded-2xl font-bold text-base
        transition-all duration-300 ease-out transform-gpu
        ${!disabled && !isRunning ? 'hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20' : ''}
        ${isRunning ? 'scale-[0.98] border-orange-400/70 shadow-xl shadow-orange-500/30' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.96]'}
        focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400
        overflow-hidden min-w-[180px] backdrop-blur-sm
      `}
    >
      {/* Animated gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-500
        ${isRunning 
          ? 'bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 opacity-100' 
          : 'bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100'
        }
      `}></div>

      {/* Scanning line effect */}
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse"></div>
          <div className="absolute -inset-x-2 top-0 h-full">
            <div className="w-1 h-full bg-gradient-to-b from-transparent via-orange-400/50 to-transparent animate-slide-right"></div>
          </div>
        </div>
      )}

      {/* Hexagonal pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,1 18,6 18,14 10,19 2,14 2,6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative flex items-center space-x-4 z-10">
        {/* Icon section */}
        <div className="relative">
          {isRunning ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
              <Square className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 animate-ping opacity-30"></div>
            </div>
          ) : (
            <div className={`
              relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
              ${!disabled 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 shadow-lg group-hover:shadow-cyan-500/30' 
                : 'bg-gradient-to-br from-gray-600 to-gray-700'
              }
            `}>
              <Play className="h-5 w-5 text-white ml-0.5" />
              {!disabled && (
                <>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
                </>
              )}
            </div>
          )}
        </div>

        {/* Text section */}
        <div className="flex flex-col items-start space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-black tracking-wide transition-colors duration-300 ${
              isRunning 
                ? 'text-orange-300' 
                : !disabled 
                  ? 'text-white group-hover:text-cyan-300' 
                  : 'text-gray-400'
            }`}>
              {isRunning ? 'EXECUTING' : 'RUN'}
            </span>
            <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
              isRunning 
                ? 'text-orange-400 animate-pulse' 
                : !disabled 
                  ? 'text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1' 
                  : 'text-gray-600'
            }`} />
          </div>
          <div className="flex items-center space-x-1">
            <Code2 className={`h-3 w-3 transition-colors duration-300 ${
              isRunning 
                ? 'text-orange-400' 
                : !disabled 
                  ? 'text-gray-500 group-hover:text-cyan-400' 
                  : 'text-gray-600'
            }`} />
            <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
              isRunning 
                ? 'text-orange-400' 
                : !disabled 
                  ? 'text-gray-500 group-hover:text-cyan-400' 
                  : 'text-gray-600'
            }`}>
              {isRunning ? 'Processing...' : 'Start Build'}
            </span>
          </div>
        </div>
      </div>

      {/* Particle effects */}
      {!disabled && !isRunning && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-2 left-4 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-100"></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
          <div className="absolute bottom-4 left-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500"></div>
        </div>
      )}

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
    </button>
  );
};

export default RunButton;