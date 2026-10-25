import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard/Dashboard';
import { UnlockModal } from './components/Dashboard/UnlockModal';
import { fetchGeneratedGitFolio, GENERATION_STEPS, PortfolioData } from './services/api';
import { mockUser, mockRepositories, mockTechStack, generateInitialReadmeMarkdown } from './mock/dummyData';
import { Terminal, Code2, Award } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'loading' | 'dashboard'>('landing');
  const [targetUsername, setTargetUsername] = useState('alexdeveloper');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  
  // Stored generated data
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    user: mockUser,
    repositories: mockRepositories,
    techStack: mockTechStack,
    readmeMarkdown: generateInitialReadmeMarkdown(mockUser, mockRepositories),
  });

  const handleGenerate = async (username: string) => {
    setTargetUsername(username);
    setCurrentView('loading');
    setCurrentStepIndex(0);

    try {
      const data = await fetchGeneratedGitFolio(username, (stepIndex) => {
        setCurrentStepIndex(stepIndex);
      });

      setPortfolioData(data);
      // Small pause after last step to reveal 100% completion
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 500);
    } catch (err) {
      console.error('Generation failed:', err);
      setCurrentView('landing');
    }
  };

  const handleReset = () => {
    setCurrentView('landing');
  };

  const handleExploreTemplates = () => {
    if (currentView !== 'dashboard') {
      handleGenerate('alexdeveloper');
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onReset={handleReset}
        onExploreTemplates={handleExploreTemplates}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection
              onGenerate={handleGenerate}
              onExploreTemplates={handleExploreTemplates}
            />

            {/* Why CS Students & Recruiters Love GitFolio Section */}
            <section id="features" className="py-20 border-t border-slate-800/80 bg-[#070b14] relative">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    Engineered for Junior Developers
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                    Why recruiters skip resume PDFs and look for GitFolios
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base mt-3">
                    Most students submit the same generic templates. GitFolio proves you have real code, verified commit activity, and working prototypes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Automated Tech Stack Verification</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Instead of just listing "C++" or "Python" on your resume, GitFolio analyzes your repo dependencies and links directly to your commits.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Dual Pipeline (README + Web)</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Get a gorgeous GitHub Profile <code className="text-emerald-300">README.md</code> that looks stellar on GitHub, plus a 1-page personal website ready for LinkedIn.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Zero Maintenance & 100% Free</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Deploy effortlessly to GitHub Pages with 0 hosting costs. No monthly Vercel subscriptions or database maintenance.
                    </p>
                  </div>
                </div>

                {/* Callout box */}
                <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-white">Ready for your upcoming placement drive?</h4>
                    <p className="text-slate-400 text-sm mt-1">Generate your recruiter-ready portfolio in less than 30 seconds.</p>
                  </div>
                  <button
                    onClick={() => handleGenerate('alexdeveloper')}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan shrink-0 transition-transform hover:scale-105"
                  >
                    Try Sample Profile Now →
                  </button>
                </div>

              </div>
            </section>
          </>
        )}

        {currentView === 'loading' && (
          <LoadingScreen
            username={targetUsername}
            currentStepIndex={currentStepIndex}
            steps={GENERATION_STEPS}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            user={portfolioData.user}
            repos={portfolioData.repositories}
            techStack={portfolioData.techStack}
            initialMarkdown={portfolioData.readmeMarkdown}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Global Pricing / Unlock Modal */}
      <UnlockModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onUnlockSuccess={() => {}}
      />

      {/* Global Developer Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-bold">&gt;_ GitFolio Maker</span>
            <span>• Open Source Boilerplate for CS Students & Junior Devs</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-mono text-[11px]">
            <span>FastAPI & Python Backend Ready</span>
            <span>Tailwind CSS</span>
            <span>GitHub Pages Compatible</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default App;
