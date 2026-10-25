# 🚀 GitFolio Maker

> **Automated GitHub-to-Portfolio & README Generator targeted at Computer Science students and junior developers.**

![License](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)
![React](https://img.shields.io/badge/React-18-cyan.svg?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?style=flat-square&logo=vite)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Ready-059669.svg?style=flat-square&logo=fastapi)

---

## 🌟 Key Features

1. **Recruiter-Ready Landing Page**
   - High-contrast, developer-focused Dark Mode aesthetic inspired by GitHub and Vercel (`#090d16` background with glowing cyan `#00f2fe` and emerald `#10b981` accents).
   - Placement Season 2025 badge & value props targeted at internships and campus placements.
   - GitHub username/URL input with quick-fill presets (`alexdeveloper`, `torvalds`, `shadcn`).

2. **Real-Time Terminal Loading Experience**
   - Sleek streaming terminal animation simulating code analysis, language detection, and repository scoring.
   - Stepped checklist showing live progress bar and status feedback.

3. **Core Dashboard — Split View Experience**
   - **Left Panel (Profile README Generator):**
     - GitHub-flavored Markdown editor with live character/word count.
     - Toggle between editable **Code Editor** and rendered **GitHub View**.
     - One-click "Copy to Clipboard" with animated checkmark feedback.
     - Quick Add buttons for LeetCode stats, Certifications, and Visitor Counters.
     - Direct file download (`README.md`).
   - **Right Panel (Live Personal Portfolio Preview):**
     - Simulated browser chrome (`https://alexdeveloper.gitfolio.me`).
     - Responsive device toggle (**Desktop**, **Tablet**, **Mobile**).
     - Verified technical skills categorized by Languages, Frontend, Backend & Cloud, and Tools.
     - Pinned project cards with star/fork counters, live demo links, topics, and architectural highlights.
     - GitHub consistency graph & language distribution breakdown.

4. **Monetization & Premium Templates Callout**
   - Visually distinct showcase below the portfolio preview with 3 premium templates:
     - **Retro Terminal & Hacker CLI:** Interactive bash terminal where recruiters can type commands like `cat skills.txt` or `curl resume.pdf`.
     - **Silicon Valley 3D Glass:** Parallax scrolling, frosted glassmorphism, and tilt cards.
     - **Minimalist Notion Style:** Clean typographic layout for FAANG & Quant hiring managers.
   - Padlock status indicators and an interactive **"Unlock All for ₹99"** checkout modal simulator (featuring UPI QR code, student promo `CAMPUS2025`, and celebratory confetti).

5. **Standalone HTML Export**
   - Generate and download a self-contained single-file HTML portfolio ready for 1-click **GitHub Pages** deployment with zero hosting cost.

---

## 🛠️ Project Structure

```text
gitfolio_maker_ui_boilerplate/
├── backend/                        # Optional Python FastAPI backend
│   ├── main.py                     # GitHub REST API aggregator & parser
│   └── requirements.txt            # FastAPI, httpx, uvicorn
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx       # Core split-view container & toolbar
│   │   │   ├── ReadmePanel.tsx     # Markdown editor & live preview
│   │   │   ├── PortfolioPanel.tsx  # Browser preview & responsive viewport
│   │   │   ├── PremiumTemplates.tsx# Monetization showcase
│   │   │   ├── UnlockModal.tsx     # ₹99 UPI/Card payment modal simulator
│   │   │   └── ExportModal.tsx     # Standalone HTML export dialog
│   │   ├── HeroSection.tsx         # Hero with placement copy & quick-fill
│   │   ├── LoadingScreen.tsx       # Developer terminal loader
│   │   ├── Navbar.tsx              # Brand header & GitHub star chip
│   │   └── icons.tsx               # Crisp SVG icons for GitHub, LinkedIn, Twitter/X
│   ├── mock/
│   │   └── dummyData.ts            # Realistic CS junior profile (Alex Rivera)
│   ├── services/
│   │   └── api.ts                  # API service layer (mock or live Python backend)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main view state orchestrator
│   ├── index.css                   # Custom scrollbars, glowing utility classes
│   └── main.tsx                    # React DOM root entry
├── index.html                      # HTML root with Inter & JetBrains Mono fonts
├── package.json                    # Dependencies & scripts
├── tailwind.config.js              # Dark mode theme & custom colors
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite bundler config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- (Optional) Python 3.10+ for the backend

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

To compile a production build:
```bash
npm run build
```

---

### 2. (Optional) Python Backend Setup

The frontend is currently powered by a mock data service (`src/services/api.ts`) that functions independently out-of-the-box. To connect real live GitHub API data:

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

The FastAPI backend will start at `http://localhost:8000`.

To point the frontend to the backend, simply uncomment the `fetch()` call in `src/services/api.ts`.

---

## 🎨 Design System

- **Background:** `#090d16` (Deep Obsidian / Charcoal)
- **Surfaces & Panels:** `#0b101c`, `#0e1524`, `#121b2d`
- **Primary Accent:** `#00f2fe` (Neon Cyan)
- **Secondary Accent:** `#10b981` (Emerald Green)
- **Warning / Star:** `#f59e0b` (Amber)
- **Typography:**
  - Body & Headings: `Inter`, sans-serif
  - Code & Terminals: `JetBrains Mono`, `Fira Code`, monospace
