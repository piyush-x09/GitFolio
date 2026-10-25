import { UserProfile, Repository, TechStackItem } from '../types';
import { mockUser, mockRepositories, mockTechStack, generateInitialReadmeMarkdown } from '../mock/dummyData';

export interface GenerationStep {
  id: string;
  label: string;
  detail: string;
}

export const GENERATION_STEPS: GenerationStep[] = [
  { id: 'connect', label: 'Connecting to GitHub REST API', detail: 'Authenticating and verifying rate limits' },
  { id: 'profile', label: 'Retrieving Developer Profile', detail: 'Extracting bio, avatar, contributions, and social links' },
  { id: 'repos', label: 'Scanning Public Repositories', detail: 'Discovered repositories, commit history & release tags' },
  { id: 'techstack', label: 'Analyzing Codebases & Tech Stack', detail: 'Parsing languages, frameworks, package.json & requirements.txt' },
  { id: 'projects', label: 'Ranking High-Impact Projects', detail: 'Scoring projects by stars, commits, documentation & complexity' },
  { id: 'synthesize', label: 'Generating README.md & Live Portfolio', detail: 'Assembling responsive recruiter-tailored portfolio' },
];

export interface PortfolioData {
  user: UserProfile;
  repositories: Repository[];
  techStack: TechStackItem[];
  readmeMarkdown: string;
}

/**
 * Service to generate portfolio data from a GitHub username.
 * Currently uses mock data with realistic progress callbacks.
 * In a production setup, this can be swapped with:
 * const response = await fetch(`/api/generate?username=${encodeURIComponent(username)}`);
 */
export async function fetchGeneratedGitFolio(
  username: string,
  onProgress?: (stepIndex: number, step: GenerationStep) => void
): Promise<PortfolioData> {
  const cleanUsername = username.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '') || 'alexdeveloper';

  // Realistic staged delay for the terminal loader
  for (let i = 0; i < GENERATION_STEPS.length; i++) {
    if (onProgress) {
      onProgress(i, GENERATION_STEPS[i]);
    }
    // Simulate API step processing time
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  // Customize mock user with the provided username if entered
  const customizedUser: UserProfile = {
    ...mockUser,
    username: cleanUsername,
    name: cleanUsername === 'alexdeveloper' ? 'Alex Rivera' : cleanUsername.split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    githubUrl: `https://github.com/${cleanUsername}`
  };

  const readmeMarkdown = generateInitialReadmeMarkdown(customizedUser, mockRepositories);

  return {
    user: customizedUser,
    repositories: mockRepositories,
    techStack: mockTechStack,
    readmeMarkdown,
  };
}

/**
 * Helper to download raw text as a file (e.g. README.md or HTML)
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/markdown') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
