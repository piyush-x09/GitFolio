import React, { useState } from 'react';
import { X, Download, Check, Copy } from 'lucide-react';
import { downloadFile } from '../../services/api';
import { UserProfile, Repository, TechStackItem } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  repos: Repository[];
  techStack: TechStackItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  user,
  repos,
  techStack,
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);

  if (!isOpen) return null;

  const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${user.name} | Developer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: #090d16; color: #f1f5f9; }
    code, pre { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="p-6 md:p-12 max-w-4xl mx-auto">
  <header class="mb-12 border-b border-slate-800 pb-8 flex items-center gap-6">
    <img src="${user.avatar}" alt="${user.name}" class="w-24 h-24 rounded-2xl border-2 border-cyan-400" />
    <div>
      <h1 class="text-3xl font-bold">${user.name}</h1>
      <p class="text-cyan-400 font-mono">${user.title}</p>
      <p class="text-slate-400 text-sm mt-2">${user.bio}</p>
    </div>
  </header>

  <section class="mb-8">
    <h2 class="text-xl font-bold mb-3">Skills & Arsenal</h2>
    <div class="flex flex-wrap gap-2">
      ${techStack.map(s => `<span class="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">${s.name} (${s.level})</span>`).join('')}
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-xl font-bold mb-4">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${repos.map(r => `
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h3 class="font-bold text-cyan-400"><a href="${r.repoUrl}">${r.displayName || r.name}</a></h3>
        <p class="text-xs text-slate-300 mt-1">${r.description}</p>
        <div class="mt-3 text-xs font-mono text-slate-400">Language: ${r.language} | Stars: ⭐ ${r.stars}</div>
      </div>
      `).join('')}
    </div>
  </section>

  <footer class="text-center text-xs text-slate-500 pt-8 border-t border-slate-800">
    Generated with GitFolio Maker
  </footer>
</body>
</html>`;

  const handleDownloadHtml = () => {
    downloadFile(standaloneHtml, `${user.username}-portfolio.html`, 'text/html');
  };

  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(standaloneHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#0d1424] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white">Export Developer Portfolio</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Download your portfolio as a 100% self-contained standalone HTML bundle. You can push this straight to your GitHub repository to enable free hosting with <strong>GitHub Pages</strong>.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-semibold">GitHub Pages Deployment in 3 Steps:</div>
            <ol className="list-decimal pl-4 space-y-1 text-slate-400">
              <li>Create a repo named <code className="text-white">{user.username}.github.io</code></li>
              <li>Upload this <code className="text-white">index.html</code></li>
              <li>Your portfolio is live instantly at <code className="text-emerald-400">https://{user.username}.github.io</code></li>
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadHtml}
              className="py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
            >
              <Download className="w-4 h-4" />
              <span>Download HTML</span>
            </button>

            <button
              onClick={handleCopyHtml}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedHtml ? 'Copied Code!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
