import React, { useState } from 'react';
import { 
  Star, 
  GitFork, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Terminal, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle,
  Code2,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedInIcon, TwitterXIcon } from '../icons';
import { UserProfile, Repository, TechStackItem, DevicePreviewMode } from '../../types';

interface PortfolioPanelProps {
  user: UserProfile;
  repos: Repository[];
  techStack: TechStackItem[];
  deviceMode: DevicePreviewMode;
  onChangeDeviceMode: (mode: DevicePreviewMode) => void;
  accentColor?: string;
}

export const PortfolioPanel: React.FC<PortfolioPanelProps> = ({
  user,
  repos,
  techStack,
  deviceMode,
  onChangeDeviceMode,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend & Cloud', 'Tools & Databases'];

  const filteredSkills = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(s => s.category === activeCategory);

  const handleCopyEmail = () => {
    if (user.email) {
      navigator.clipboard.writeText(user.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Adjust preview viewport wrapper width based on selected deviceMode
  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[640px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0b101c] rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl">
      
      {/* Top Browser Chrome Bar */}
      <div className="px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        
        {/* Browser Dots & URL */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex-1 max-w-sm truncate">
            <span className="text-emerald-400">https://</span>
            <span className="text-white font-medium">{user.username}</span>
            <span className="text-slate-500">.gitfolio.me</span>
          </div>
        </div>

        {/* Device Switcher (Desktop / Tablet / Mobile) */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => onChangeDeviceMode('desktop')}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === 'desktop' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeDeviceMode('tablet')}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === 'tablet' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeDeviceMode('mobile')}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === 'mobile' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Viewport container with auto scroll */}
      <div className="flex-1 overflow-y-auto bg-[#070a12] p-2 sm:p-4 flex justify-center">
        <div className={`${getContainerWidth()} w-full bg-[#090d16] border border-slate-800/80 rounded-xl transition-all duration-300 shadow-2xl overflow-hidden flex flex-col`}>
          
          {/* Portfolio Internal Navigation */}
          <nav className="sticky top-0 z-20 px-6 py-3.5 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-cyan-400">&gt;_{user.username}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </nav>

          {/* 1. Hero Section */}
          <section id="about" className="p-6 sm:p-8 border-b border-slate-800/60 relative overflow-hidden">
            {/* Soft decorative background radial glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Status Pill */}
            {user.availableForWork && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for SDE Internships & Full-Time Roles (2025/2026)</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Profile Avatar with Glowing Border */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 shadow-glow-cyan">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-slate-900 border border-slate-700 p-1.5 rounded-lg shadow text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <p className="text-cyan-400 font-mono text-sm sm:text-base font-medium mt-0.5">
                  {user.title}
                </p>

                {/* College & Location */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-2 font-sans">
                  {user.college && (
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.degree} • {user.college} ('{user.graduationYear?.slice(-2)})</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {user.bio}
                </p>
              </div>
            </div>

            {/* Quick CTAs & Metrics */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${user.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
                >
                  <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Get In Touch</span>
                </a>

                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* GitHub Stats Chips */}
              <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{user.totalStars}</span>
                  <span className="text-[11px] text-slate-500">Stars</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-white font-medium">{user.publicRepos}</span>
                  <span className="text-[11px] text-slate-500">Repos</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Skills & Tech Stack Section */}
          <section id="skills" className="p-6 sm:p-8 border-b border-slate-800/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Technical Arsenal & Skills</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Technologies verified from GitHub repositories & commit history
                </p>
              </div>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    activeCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform" 
                      style={{ backgroundColor: skill.badgeColor || '#00f2fe' }}
                    />
                    <span className="text-xs font-medium text-slate-200 font-mono">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Featured Pinned Projects Section */}
          <section id="projects" className="p-6 sm:p-8 border-b border-slate-800/60">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Featured Engineering Projects</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Curated high-impact systems, webapps, and open-source packages
                </p>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 hover:border-slate-700 hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Name + Stars */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {repo.displayName || repo.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{repo.stars}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {repo.description}
                    </p>

                    {/* Highlights bullet points if present */}
                    {repo.highlights && repo.highlights.length > 0 && (
                      <ul className="mb-3 space-y-1 text-[11px] text-slate-300 font-sans">
                        {repo.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 font-mono">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Topics Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {repo.topics.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono border border-slate-800">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Language + External Links */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      <span>{repo.language}</span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {repo.liveUrl && (
                        <a
                          href={repo.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-sans text-xs font-medium"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                      <a
                        href={repo.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. GitHub Contributions & Activity Mockup */}
          <section className="p-6 sm:p-8 border-b border-slate-800/60 bg-slate-950/40">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono mb-3">
              GitHub Consistency & Activity
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-mono">Total Annual Contributions</p>
                <p className="text-xl font-extrabold text-white font-mono mt-0.5">1,428 Commits</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3" /> Longest Streak: 48 Days Continuous
                </p>
              </div>

              {/* Language distribution bar */}
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Language Distribution</span>
                  <span className="text-cyan-400">Top: C++ (42%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                  <div style={{ width: '42%' }} className="bg-[#00599C]" title="C++ 42%" />
                  <div style={{ width: '30%' }} className="bg-[#3776AB]" title="Python 30%" />
                  <div style={{ width: '18%' }} className="bg-[#3178C6]" title="TypeScript 18%" />
                  <div style={{ width: '10%' }} className="bg-[#00ADD8]" title="Go 10%" />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00599C]" /> C++</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3776AB]" /> Python</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3178C6]" /> TS</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00ADD8]" /> Go</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Contact & Socials Footer */}
          <footer id="contact" className="p-6 sm:p-8 bg-slate-950/80 text-center space-y-4">
            <h3 className="text-base font-bold text-white">Let's Build Something Great Together</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              I'm actively interviewing for software engineering roles, hackathons, and innovative open-source projects.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedEmail ? 'Email Copied!' : user.email}</span>
              </button>

              <a
                href={user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : '#'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              {user.twitter && (
                <a
                  href={`https://twitter.com/${user.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                  title="Twitter / X Profile"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              )}

              <a
                href={user.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-600 font-mono">
              Crafted with GitFolio Maker • Hosted on GitHub Pages Ready
            </div>
          </footer>

        </div>
      </div>

    </div>
  );
};
