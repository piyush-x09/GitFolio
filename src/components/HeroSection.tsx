import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Zap, Code2, Layout } from 'lucide-react';
import { GithubIcon } from './icons';

interface HeroSectionProps {
  onGenerate: (username: string) => void;
  onExploreTemplates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGenerate, onExploreTemplates }) => {
  const [usernameInput, setUsernameInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      // Default to demo username if empty
      onGenerate('alexdeveloper');
      return;
    }
    onGenerate(usernameInput.trim());
  };

  const handleQuickPreset = (preset: string) => {
    setUsernameInput(preset);
    onGenerate(preset);
  };

  return (
    <div className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-600/10 blur-[100px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Placement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/90 border border-cyan-500/30 text-cyan-300 shadow-glow-subtle mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white">Placement Season 2025</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300">Fast-track your job & internship applications</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Turn Your GitHub into a{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Stunning Portfolio
          </span>{' '}
          in Seconds.
        </h1>

        {/* Subheadline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed font-normal mb-10">
          No coding, hosting, or CSS configuration required. Ideal for <strong className="text-white font-medium">CS students</strong>, <strong className="text-white font-medium">placement drives</strong>, and <strong className="text-white font-medium">junior developers</strong>. Generate a recruiter-ready personal website and a high-converting profile <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-sm">README.md</code> instantly.
        </p>

        {/* Primary Input Box & Form */}
        <div className="max-w-2xl mx-auto mb-6">
          <form 
            onSubmit={handleSubmit}
            className="p-1.5 sm:p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl focus-within:border-cyan-400 focus-within:shadow-glow-cyan transition-all duration-300 flex flex-col sm:flex-row gap-2 relative group"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
              <GithubIcon className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors shrink-0" />
              <div className="flex items-center text-slate-500 font-mono text-sm hidden sm:inline">
                github.com/
              </div>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="alexdeveloper (or repo URL)"
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none font-mono text-sm sm:text-base py-1"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>Generate Now</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span>Try sample profiles:</span>
            <button
              onClick={() => handleQuickPreset('alexdeveloper')}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-slate-700 font-mono transition-colors flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              alexdeveloper (CS Junior)
            </button>
            <button
              onClick={() => handleQuickPreset('torvalds')}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 font-mono transition-colors"
            >
              torvalds
            </button>
            <button
              onClick={() => handleQuickPreset('shadcn')}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 font-mono transition-colors"
            >
              shadcn
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-2.5 py-1 rounded-md bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/80 font-mono transition-colors flex items-center gap-1"
            >
              <Layout className="w-3 h-3 text-cyan-400" />
              <span>Browse 3+ Templates</span>
            </button>
          </div>
        </div>

        {/* Value Proposition Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Recruiter & ATS Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Interactive Pinned Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Profile README.md</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>One-Click HTML/ZIP Export</span>
          </div>
        </div>

        {/* Feature Preview Showcase Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/30 to-transparent shadow-2xl">
          <div className="rounded-xl bg-[#0b101b] border border-slate-800/90 overflow-hidden text-left">
            
            {/* Window Topbar */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 text-xs font-mono text-slate-400">gitfolio-maker --output dual-view</span>
              </div>
              <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                Live Dual Pipeline
              </div>
            </div>

            {/* Split Teaser Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Left: README Output Teaser */}
              <div className="p-5 sm:p-6 bg-slate-950/60 font-mono text-xs">
                <div className="flex items-center justify-between mb-3 text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Code2 className="w-3.5 h-3.5" />
                    Generated README.md
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Markdown</span>
                </div>
                <div className="space-y-2 text-slate-300 opacity-90 leading-relaxed">
                  <p className="text-cyan-300 font-semibold"># Hi there, I'm Alex Rivera 👋</p>
                  <p className="text-slate-400">### 🚀 Full-Stack Developer & Systems Enthusiast</p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] border border-blue-700/50">LinkedIn</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] border border-emerald-700/50">Portfolio</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">Email</span>
                  </div>
                  <p className="text-slate-400 pt-2 font-mono text-[11px]">
                    - 🎓 <strong className="text-white">B.Tech in CS @ NIT</strong> (2026) <br/>
                    - 🛠️ <span className="text-emerald-400">C++, Python, TypeScript, FastAPI, Docker</span><br/>
                    - 📌 4 Pinned Production Repositories (486+ ⭐)
                  </p>
                </div>
              </div>

              {/* Right: Portfolio Preview Teaser */}
              <div className="p-5 sm:p-6 bg-[#0d1424]/70">
                <div className="flex items-center justify-between mb-3 text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Live 1-Page Portfolio
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                    alexrivera.gitfolio.me
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                      alt="Alex" 
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
                      Alex Rivera
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </h4>
                    <p className="text-xs text-slate-400">B.Tech CS Junior • Systems & Web</p>
                  </div>
                </div>
                {/* Micro project card */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-cyan-300">
                    <span>⚡ NeuralCanvas Engine</span>
                    <span className="text-amber-400">⭐ 215</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    Interactive neural net visualizer in WebAssembly & WebGL.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
