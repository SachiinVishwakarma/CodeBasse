import React from 'react';
import { Github, Globe, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-slate-700/50 py-4 sm:py-6 mt-4 sm:mt-8">
      <div className="max-w-[2000px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Main Footer Text */}
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span className="text-sm">Made by</span>
            <div className="flex items-center space-x-1">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-4 w-4 sm:h-6 sm:w-6 object-contain"
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">CodeBase Team</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Connect:</span>
              <a
                href="https://github.com/SachiinVishwakarma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://sachinvishw.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                title="Portfolio"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/insachin-vishwakarma-907a282a4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-slate-700/50 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 CodeBase IDE v1.0 : by Sachin Vishwakarma. All rights reserved.
          </p>
        </div> 
      </div>
    </footer>
  );
};

export default Footer;