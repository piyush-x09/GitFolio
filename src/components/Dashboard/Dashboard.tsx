import React, { useState } from 'react';
import { 
  Columns, 
  FileText, 
  Layout, 
  Download, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import { ReadmePanel } from './ReadmePanel';
import { PortfolioPanel } from './PortfolioPanel';
import { PremiumTemplates } from './PremiumTemplates';
import { UnlockModal } from './UnlockModal';
import { ExportModal } from './ExportModal';
import { UserProfile, Repository, TechStackItem, PremiumTemplate, ViewMode, DevicePreviewMode } from '../../types';
import { mockPremiumTemplates } from '../../mock/dummyData';

interface DashboardProps {
  user: UserProfile;
  repos: Repository[];
  techStack: TechStackItem[];
  initialMarkdown: string;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  repos,
  techStack,
  initialMarkdown,
  onReset,
}) => {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [deviceMode, setDeviceMode] = useState<DevicePreviewMode>('desktop');
  
  // Modals state
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PremiumTemplate | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [hasUnlockedPremium, setHasUnlockedPremium] = useState(false);

  const handleOpenUnlock = (template?: PremiumTemplate) => {
    setSelectedTemplate(template || null);
    setIsUnlockModalOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Dashboard Top Control Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0b101c] border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        
        {/* Left: User handle pill & status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Generate for another profile"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white">{user.name}</h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                @{user.username}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5 hidden sm:block">
              {repos.length} Repositories Synced • Profile & README Ready
            </p>
          </div>
        </div>

        {/* Center: View Layout Switcher (Split / README / Portfolio) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split View</span>
          </button>

          <button
            onClick={() => setViewMode('readme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'readme'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>README Only</span>
          </button>

          <button
            onClick={() => setViewMode('portfolio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'portfolio'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Portfolio Only</span>
          </button>
        </div>

        {/* Right: Actions (Export HTML, Unlock Premium) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Portfolio</span>
          </button>

          <button
            onClick={() => handleOpenUnlock()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan transition-all"
          >
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{hasUnlockedPremium ? 'Templates Unlocked' : 'Unlock Premium (₹99)'}</span>
          </button>
        </div>

      </div>

      {/* Main Core View Area */}
      {viewMode === 'split' ? (
        /* Split View: Left README Panel, Right Portfolio Panel */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start min-h-[750px]">
          <div className="h-[750px] sticky top-20">
            <ReadmePanel
              markdown={markdown}
              onChangeMarkdown={setMarkdown}
              user={user}
              repos={repos}
            />
          </div>

          <div className="h-[750px]">
            <PortfolioPanel
              user={user}
              repos={repos}
              techStack={techStack}
              deviceMode={deviceMode}
              onChangeDeviceMode={setDeviceMode}
            />
          </div>
        </div>
      ) : viewMode === 'readme' ? (
        /* README Only View */
        <div className="max-w-4xl mx-auto h-[780px]">
          <ReadmePanel
            markdown={markdown}
            onChangeMarkdown={setMarkdown}
            user={user}
            repos={repos}
          />
        </div>
      ) : (
        /* Portfolio Only View */
        <div className="h-[800px]">
          <PortfolioPanel
            user={user}
            repos={repos}
            techStack={techStack}
            deviceMode={deviceMode}
            onChangeDeviceMode={setDeviceMode}
          />
        </div>
      )}

      {/* Premium Feature Callout Section (Below Standard Portfolio) */}
      <PremiumTemplates
        templates={mockPremiumTemplates}
        onUnlockClick={handleOpenUnlock}
      />

      {/* Unlock Monetization Modal */}
      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        selectedTemplate={selectedTemplate}
        onUnlockSuccess={() => setHasUnlockedPremium(true)}
      />

      {/* Standalone Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        user={user}
        repos={repos}
        techStack={techStack}
      />

    </div>
  );
};
