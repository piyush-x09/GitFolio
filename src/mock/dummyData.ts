import { UserProfile, Repository, TechStackItem, PremiumTemplate } from '../types';

export const mockUser: UserProfile = {
  username: 'alexdeveloper',
  name: 'Alex Rivera',
  title: 'Full-Stack Developer & Systems Enthusiast',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'CS Junior @ Tech Institute. Passionate about distributed systems, modern web architectures, and building developer tooling with high impact.',
  location: 'Bengaluru, India',
  college: 'National Institute of Technology',
  degree: 'B.Tech in Computer Science & Engineering',
  graduationYear: '2026',
  company: 'Open-Source Contributor',
  website: 'https://alexrivera.dev',
  twitter: 'alexrivera_dev',
  linkedin: 'alex-rivera-cs',
  email: 'alex.rivera.dev@gmail.com',
  githubUrl: 'https://github.com/alexdeveloper',
  followers: 438,
  following: 112,
  publicRepos: 28,
  totalStars: 486,
  availableForWork: true,
};

export const mockTechStack: TechStackItem[] = [
  // Languages
  { name: 'C++', category: 'Languages', level: 'Advanced', badgeColor: '#00599C' },
  { name: 'Python', category: 'Languages', level: 'Advanced', badgeColor: '#3776AB' },
  { name: 'TypeScript', category: 'Languages', level: 'Advanced', badgeColor: '#3178C6' },
  { name: 'Go', category: 'Languages', level: 'Intermediate', badgeColor: '#00ADD8' },
  { name: 'Java', category: 'Languages', level: 'Intermediate', badgeColor: '#ED8B00' },
  
  // Frontend
  { name: 'React.js', category: 'Frontend', level: 'Advanced', badgeColor: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', level: 'Intermediate', badgeColor: '#000000' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', badgeColor: '#06B6D4' },
  { name: 'Redux Toolkit', category: 'Frontend', level: 'Intermediate', badgeColor: '#764ABC' },
  
  // Backend & Cloud
  { name: 'FastAPI', category: 'Backend & Cloud', level: 'Advanced', badgeColor: '#009688' },
  { name: 'Node.js', category: 'Backend & Cloud', level: 'Advanced', badgeColor: '#339933' },
  { name: 'PostgreSQL', category: 'Backend & Cloud', level: 'Advanced', badgeColor: '#4169E1' },
  { name: 'Redis', category: 'Backend & Cloud', level: 'Intermediate', badgeColor: '#DC382D' },
  { name: 'Docker', category: 'Backend & Cloud', level: 'Intermediate', badgeColor: '#2496ED' },
  { name: 'AWS (S3, EC2)', category: 'Backend & Cloud', level: 'Familiar', badgeColor: '#FF9900' },

  // Tools & Databases
  { name: 'Git & GitHub Actions', category: 'Tools & Databases', level: 'Advanced', badgeColor: '#F05032' },
  { name: 'Linux / Bash', category: 'Tools & Databases', level: 'Advanced', badgeColor: '#FCC624' },
  { name: 'Postman', category: 'Tools & Databases', level: 'Advanced', badgeColor: '#FF6C37' },
  { name: 'MongoDB', category: 'Tools & Databases', level: 'Intermediate', badgeColor: '#47A248' },
];

export const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'neural-canvas-engine',
    displayName: 'NeuralCanvas Engine',
    description: 'High-performance interactive neural net visualization in the browser with WebGL & WebAssembly.',
    language: 'TypeScript',
    languageColor: '#3178C6',
    stars: 215,
    forks: 38,
    topics: ['webassembly', 'webgl', 'deep-learning', 'react', 'visualization'],
    repoUrl: 'https://github.com/alexdeveloper/neural-canvas-engine',
    liveUrl: 'https://neural-canvas.demo.app',
    updatedDate: 'Updated 2 days ago',
    isPinned: true,
    highlights: [
      'Render 10,000+ nodes at 60 FPS using instanced WebGL shaders',
      'Interactive backpropagation visualizer for CS students',
      'Featured on Hacker News frontpage & Reddit /r/programming'
    ]
  },
  {
    id: 'repo-2',
    name: 'devflow-cli',
    displayName: 'DevFlow Productivity CLI',
    description: 'Blazing-fast terminal companion to manage micro-services, git branches, and local Docker containers.',
    language: 'Go',
    languageColor: '#00ADD8',
    stars: 142,
    forks: 24,
    topics: ['cli', 'golang', 'docker-api', 'terminal-ui', 'productivity'],
    repoUrl: 'https://github.com/alexdeveloper/devflow-cli',
    liveUrl: 'https://github.com/alexdeveloper/devflow-cli/releases',
    updatedDate: 'Updated 1 week ago',
    isPinned: true,
    highlights: [
      'Zero-dependency standalone binary with cross-platform support',
      'Automates multi-repo branch staging and environment seeding',
      '1,200+ monthly active terminal downloads'
    ]
  },
  {
    id: 'repo-3',
    name: 'distributed-cache-raft',
    displayName: 'Raft Distributed KV Store',
    description: 'Fault-tolerant distributed key-value store implementing the Raft consensus algorithm with write-ahead logging.',
    language: 'C++',
    languageColor: '#00599C',
    stars: 89,
    forks: 18,
    topics: ['distributed-systems', 'raft-consensus', 'cpp20', 'networking', 'storage-engine'],
    repoUrl: 'https://github.com/alexdeveloper/distributed-cache-raft',
    updatedDate: 'Updated 3 weeks ago',
    isPinned: true,
    highlights: [
      'Tested against Jepsen partition simulations with 99.9% consistency',
      'Optimized disk write throughput via LSM-Tree structure',
      'Benchmark results: 45,000 ops/sec per node cluster'
    ]
  },
  {
    id: 'repo-4',
    name: 'smart-resume-ats-fastapi',
    displayName: 'SmartResume AI Screener',
    description: 'Automated resume parser and job description matcher using Python FastAPI, spaCy NLP, and LangChain.',
    language: 'Python',
    languageColor: '#3776AB',
    stars: 76,
    forks: 15,
    topics: ['fastapi', 'nlp', 'langchain', 'resume-parser', 'recruitment-tech'],
    repoUrl: 'https://github.com/alexdeveloper/smart-resume-ats-fastapi',
    liveUrl: 'https://smartresume.demo.dev',
    updatedDate: 'Updated 1 month ago',
    isPinned: true,
    highlights: [
      'Extracts key technical competencies and scores keyword match density',
      'Asynchronous batch processing with Celery and Redis broker',
      'Used by 3 university placement cells for mock drives'
    ]
  }
];

export const mockPremiumTemplates: PremiumTemplate[] = [
  {
    id: 'terminal-cyberpunk',
    name: 'Retro Terminal & Hacker CLI',
    subtitle: 'Interactive Bash CLI with Executable Commands',
    description: 'Recruiters can type `cat skills.txt`, `run demo`, or `help` right in the browser! Complete with CRT scanline effects and green phosphor glow.',
    previewUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80',
    badge: 'Recruiter Favorite',
    badgeColor: 'emerald',
    features: [
      'Interactive functional CLI command parser',
      'Custom ASCII art banner generator',
      'CRT scanline toggle & retro click sound effects',
      'Instant download resume command (`curl resume.pdf`)'
    ],
    popular: true
  },
  {
    id: 'glass-3d-silicon',
    name: 'Silicon Valley 3D Glass',
    subtitle: 'Hyper-Modern Glassmorphism & Framer Motion',
    description: 'Smooth parallax scrolling, floating 3D tech stack icons, frosted glass cards, and dynamic gradient mesh backgrounds inspired by Vercel & Linear.',
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: 'Design Award',
    badgeColor: 'cyan',
    features: [
      'Interactive 3D card tilt & mouse spotlighting',
      'Dynamic light/dark glow gradient mesh',
      'Audio project preview embeds',
      'Lighthouse 100/100 performance score'
    ]
  },
  {
    id: 'executive-minimal',
    name: 'Minimalist Engineering Notion',
    subtitle: 'Clean, Typographic & Zero-Fluff Engineering Doc',
    description: 'Designed specifically for top-tier Big Tech and Quantitative Trading hiring managers who prefer zero distraction and dense engineering achievements.',
    previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    badge: 'FAANG / Quant Ready',
    badgeColor: 'purple',
    features: [
      'Print-to-PDF pixel-perfect 1-page resume match',
      'Collapsible code snippets & engineering case studies',
      'System design diagram embeds',
      'Fast 15kb total bundle size'
    ]
  }
];

export const generateInitialReadmeMarkdown = (user: UserProfile, repos: Repository[]): string => {
  return `# Hi there, I'm ${user.name} 👋 
### 🚀 ${user.title}

<p align="left">
  <a href="${user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : '#'}">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="${user.website || '#'}">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Portfolio" />
  </a>
  <a href="mailto:${user.email || ''}">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

### 💫 About Me
- 🎓 **Education:** ${user.degree || 'B.Tech in CS'} @ **${user.college || 'Engineering University'}** (Class of ${user.graduationYear || '2026'})
- 💼 **Current Focus:** Open-source contribution & high-performance distributed architectures.
- 🌱 **Currently Learning:** Distributed Consensus (Raft/Paxos), Rust, and GPU acceleration.
- ⚡ **Looking for:** **SDE Internships & Full-Time Software Engineering Roles (2025/2026)**.
- 💬 **Ask me about:** C++, Python, FastAPI, React, Systems Design, and DSA.

---

### 🛠️ Tech Stack & Skills

**Languages:**
\`\`\`cpp
const string languages[] = {"C++", "Python", "TypeScript", "Go", "Java", "SQL"};
\`\`\`

<p align="left">
  <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat-square&logo=c%2B%2B&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" />
</p>

---

### 📌 Featured Projects

| Project | Description | Tech Stack | Stars |
| :--- | :--- | :--- | :--- |
${repos.map(r => `| [**${r.displayName || r.name}**](${r.repoUrl}) | ${r.description} | \`${r.language}\` | ⭐ ${r.stars} |`).join('\n')}

---

### 📊 GitHub Analytics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user.username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" width="48%" alt="GitHub Stats" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user.username}&theme=tokyonight&hide_border=true" width="48%" alt="GitHub Streak" />
</p>

---

### 🤝 Let's Connect!
- 🌐 Check out my live interactive portfolio: [**${user.username}.gitfolio.me**](${user.website})
- 📬 Feel free to reach out via [Email](mailto:${user.email}) or connect on [LinkedIn](https://linkedin.com/in/${user.linkedin})!

⭐ *Generated with [GitFolio Maker](https://gitfolio.me) — Turn your GitHub into recruiter-ready portfolios.*
`;
};
