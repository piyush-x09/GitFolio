import React, { useState } from 'react';
import { Copy, Check, Download, Code, Eye, Sparkles, FileText } from 'lucide-react';
import { downloadFile } from '../../services/api';
import { UserProfile, Repository } from '../../types';

interface ReadmePanelProps {
  markdown: string;
  onChangeMarkdown: (val: string) => void;
  user: UserProfile;
  repos: Repository[];
}

export const ReadmePanel: React.FC<ReadmePanelProps> = ({
  markdown,
  onChangeMarkdown,
  user,
  repos,
}) => {
  const [activeTab, setActiveTab] = useState<'raw' | 'preview'>('raw');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    downloadFile(markdown, 'README.md', 'text/markdown');
  };

  // Helper to append popular markdown blocks
  const appendBlock = (blockText: string) => {
    onChangeMarkdown(markdown + '\n\n' + blockText);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b101b] rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl">
      
      {/* Top action bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700">
            <FileText className="w-3.5 h-3.5" />
            <span>Profile README.md</span>
          </div>

          {/* Raw vs Preview Toggle */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('raw')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'raw'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>GitHub View</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald font-semibold'
                : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30'
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
            title="Download README.md file"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Quick Markdown Inserts */}
      <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
        <span className="shrink-0 text-slate-500 flex items-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Add:
        </span>
        <button
          onClick={() => appendBlock(`### 🏆 Competitive Programming & LeetCode\n- ⭐️ **LeetCode:** 450+ solved (Top 5%)\n- 🥇 **Codeforces:** Specialist (1450 rating)\n- 🏆 **Hackathon Finalist:** Smart India Hackathon 2024`)}
          className="shrink-0 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300"
        >
          + LeetCode / CP Stats
        </button>
        <button
          onClick={() => appendBlock(`### 📜 Certifications & Achievements\n- AWS Certified Cloud Practitioner (2024)\n- Meta Full-Stack Professional Certificate`)}
          className="shrink-0 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300"
        >
          + Certifications
        </button>
        <button
          onClick={() => appendBlock(`![Visitor Count](https://komarev.com/ghpvc/?username=${user.username}&label=Profile%20Views&color=0e75b6&style=flat)`)}
          className="shrink-0 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300"
        >
          + Visitor Counter
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 min-h-[500px] overflow-auto relative">
        {activeTab === 'raw' ? (
          <div className="h-full relative font-mono text-xs">
            <textarea
              value={markdown}
              onChange={(e) => onChangeMarkdown(e.target.value)}
              className="w-full h-full min-h-[500px] bg-transparent text-slate-200 p-4 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none selection:bg-cyan-500/30"
              spellCheck={false}
            />
          </div>
        ) : (
          /* Rendered GitHub Markdown Preview */
          <div className="p-6 text-slate-200 space-y-4 max-w-none prose prose-invert font-sans text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Rendered as it appears on github.com/{user.username}</span>
              </div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                Hi there, I'm {user.name} 👋
              </h1>
              <h2 className="text-lg text-cyan-400 font-mono mt-2">
                🚀 {user.title}
              </h2>
            </div>

            <div className="space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
              <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-1">
                💫 About Me
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                <li>🎓 <strong>Education:</strong> {user.degree} @ <strong>{user.college}</strong> (Class of {user.graduationYear})</li>
                <li>💼 <strong>Focus:</strong> Open-source contribution & high-performance backend architectures</li>
                <li>⚡ <strong>Status:</strong> <span className="text-emerald-400 font-medium">Actively seeking SDE Internships / Graduate roles</span></li>
                <li>💬 <strong>Ask me about:</strong> C++, Python, FastAPI, React, Systems Design, and DSA</li>
              </ul>

              <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-1 pt-3">
                🛠️ Tech Stack & Badges
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {['C++', 'Python', 'TypeScript', 'Go', 'React', 'FastAPI', 'PostgreSQL', 'Docker'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-1 pt-3">
                📌 Pinned Featured Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {repos.slice(0, 4).map((repo) => (
                  <div key={repo.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-mono font-medium text-cyan-300 mb-1">
                      <span>{repo.displayName || repo.name}</span>
                      <span className="text-amber-400">⭐ {repo.stars}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mb-2">{repo.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      <span>{repo.language}</span>
                      <span>•</span>
                      <span>{repo.forks} forks</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom stats footer */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span>{markdown.length} characters</span>
          <span>•</span>
          <span>{markdown.split(/\s+/).length} words</span>
        </div>
        <div className="text-cyan-400/80">
          Markdown Syntax: GitHub Flavored
        </div>
      </div>

    </div>
  );
};
