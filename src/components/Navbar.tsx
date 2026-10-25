import React from 'react';
import { Terminal, Star, ArrowLeft } from 'lucide-react';
import { GithubIcon } from './icons';

interface NavbarProps {
  currentView: 'landing' | 'loading' | 'dashboard';
  onReset: () => void;
  onExploreTemplates?: () => void;
  onOpenPricing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onReset, onExploreTemplates, onOpenPricing }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all duration-300">
            <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                GitFolio<span className="text-cyan-400 font-mono">.maker</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono -mt-1 hidden sm:block">
              GitHub → Recruiter-Ready Portfolio
            </p>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          {currentView === 'dashboard' ? (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Generate Another</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
              <button onClick={onExploreTemplates} className="hover:text-cyan-300 transition-colors">
                Templates
              </button>
              <button onClick={onOpenPricing} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Pricing</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">₹99</span>
              </button>
            </div>
          )}

          {/* Placement Season Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Placement Special: Free Unlimited Exports</span>
          </div>

          {/* GitHub Star Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800/90 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-all shadow-inner-glow"
          >
            <GithubIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="flex items-center gap-1 text-slate-400 font-mono text-xs border-l border-slate-700 pl-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              1.2k
            </span>
          </a>
        </div>

      </div>
    </header>
  );
};
