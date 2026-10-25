import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { GenerationStep } from '../services/api';

interface LoadingScreenProps {
  username: string;
  currentStepIndex: number;
  steps: GenerationStep[];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ username, currentStepIndex, steps }) => {
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / steps.length) * 100));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-grid-pattern">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-[#0b101c] border border-cyan-500/30 rounded-2xl shadow-glow-cyan overflow-hidden relative">
        
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-slate-300 font-medium">
              gitfolio-maker-cli --user @{username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-mono text-xs text-cyan-400">ANALYZING</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Status Headline */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span>Building Recruiter Portfolio</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {progressPercent}%
                </span>
              </h3>
              <p className="text-sm text-slate-400 font-mono mt-0.5">
                Target GitHub Handle: <span className="text-cyan-300 font-semibold">{username}</span>
              </p>
            </div>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-glow-cyan"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Stepped Process List */}
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {steps.map((step, idx) => {
              const isFinished = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div 
                  key={step.id} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 shadow-sm' 
                      : isFinished 
                        ? 'bg-slate-900/60 border-slate-800/80 text-slate-300' 
                        : 'bg-transparent border-transparent text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                      {isFinished ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 flex items-center justify-center">
                          <Loader2 className="w-3 h-3 animate-spin stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto" />
                      )}
                    </div>
                    <div>
                      <span className={`font-medium ${isCurrent ? 'text-white' : ''}`}>
                        {step.label}
                      </span>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isFinished && (
                      <span className="text-[10px] text-emerald-400 font-mono">OK</span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] text-cyan-400 font-mono animate-pulse">Running...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal output simulation box */}
          <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-800/60">
              <span>stdout: /tmp/gitfolio-analyzer.log</span>
              <span className="text-emerald-400">● 200 OK</span>
            </div>
            <p className="text-slate-300">
              <span className="text-cyan-400">$</span> gitfolio-engine fetch --user={username} --rank=impact
            </p>
            <p className="text-emerald-400">
              [pipeline] parsed 4 pinned repos (neural-canvas-engine, devflow-cli, distributed-cache-raft)
            </p>
            <p className="text-slate-400">
              [stats] computed language distribution: C++ (42%), Python (30%), TypeScript (18%)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
