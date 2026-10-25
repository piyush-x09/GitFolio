import React from 'react';
import { Lock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PremiumTemplate } from '../../types';

interface PremiumTemplatesProps {
  templates: PremiumTemplate[];
  onUnlockClick: (template?: PremiumTemplate) => void;
}

export const PremiumTemplates: React.FC<PremiumTemplatesProps> = ({
  templates,
  onUnlockClick,
}) => {
  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-b from-[#10192e] to-[#0b101c] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Decorative background glow & accent lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Banner & Value Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Monetization & Placement Pack</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Unlock High-Converting <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Premium Templates</span>
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Stand out to top recruiters and hiring managers at FAANG, top startups, and quantitative firms with interactive 3D, retro terminal, and executive layouts.
          </p>
        </div>

        {/* Big Unlock Button CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline gap-1.5 justify-start sm:justify-end">
              <span className="text-xs text-slate-400 line-through">₹499</span>
              <span className="text-2xl font-black text-white">₹99</span>
              <span className="text-xs text-emerald-400 font-mono">80% OFF</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">One-time student license • Lifetime access</p>
          </div>

          <button
            onClick={() => onUnlockClick()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4 stroke-[2.5]" />
            <span>Unlock All for ₹99</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3 Premium Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 relative z-10">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`rounded-xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
              tpl.popular
                ? 'border-cyan-500/50 shadow-glow-cyan'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Visual Teaser Image with Overlay */}
            <div className="h-44 w-full relative overflow-hidden bg-slate-950">
              <img
                src={tpl.previewUrl}
                alt={tpl.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              />
              
              {/* Dark gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

              {/* Padlock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-100 group-hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              {/* Tag pill */}
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                  tpl.popular 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}>
                  {tpl.badge}
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tpl.name}
                </h4>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {tpl.subtitle}
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Feature Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                  {tpl.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <button
                onClick={() => onUnlockClick(tpl)}
                className="mt-5 w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-colors group-hover:border-cyan-500/40"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Unlock This Template (₹99)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Student Guarantee Strip */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Instant Instant Code Delivery • HTML, React & Tailwind source included</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>✓ Custom Domain Ready</span>
          <span>✓ 100% Free Hosting on GitHub Pages</span>
          <span>✓ Full Commercial Student Rights</span>
        </div>
      </div>

    </div>
  );
};
