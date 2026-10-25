"""
GitFolio Maker - Python Backend (FastAPI Scaffolding)
Connects to GitHub REST / GraphQL API to analyze repositories,
synthesize profile README.md, and assemble the recruiter-ready portfolio.
"""

from typing import List, Optional
import os
import httpx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="GitFolio Maker API",
    description="Automated GitHub-to-Portfolio & README Generator Backend",
    version="0.1.0"
)

# Allow requests from Vite frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", None)


class UserProfileSchema(BaseModel):
    username: str
    name: str
    title: str
    avatar: str
    bio: str
    location: Optional[str] = "Bengaluru, India"
    college: Optional[str] = "National Institute of Technology"
    degree: Optional[str] = "B.Tech in Computer Science & Engineering"
    graduationYear: Optional[str] = "2026"
    company: Optional[str] = None
    website: Optional[str] = None
    twitter: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None
    githubUrl: str
    followers: int
    following: int
    publicRepos: int
    totalStars: int
    availableForWork: bool = True


class RepositorySchema(BaseModel):
    id: str
    name: str
    displayName: Optional[str] = None
    description: Optional[str] = ""
    language: Optional[str] = "TypeScript"
    languageColor: str = "#00f2fe"
    stars: int = 0
    forks: int = 0
    topics: List[str] = []
    repoUrl: str
    liveUrl: Optional[str] = None
    updatedDate: str
    isPinned: bool = True
    highlights: Optional[List[str]] = []


class TechStackItemSchema(BaseModel):
    name: str
    category: str
    level: str
    badgeColor: Optional[str] = None


class PortfolioResponse(BaseModel):
    user: UserProfileSchema
    repositories: List[RepositorySchema]
    techStack: List[TechStackItemSchema]
    readmeMarkdown: str


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "GitFolio Maker Backend"}


@app.get("/api/generate", response_model=PortfolioResponse)
async def generate_portfolio(username: str = Query(..., description="GitHub handle or URL")):
    """
    Fetch GitHub profile, repositories, compute language statistics,
    and return structured portfolio data and generated README.md markdown.
    """
    clean_username = username.strip().replace("https://github.com/", "").strip("/")
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

    async with httpx.AsyncClient(timeout=10.0) as client:
        # 1. Fetch user data
        user_res = await client.get(f"https://api.github.com/users/{clean_username}", headers=headers)
        if user_res.status_code == 404:
            raise HTTPException(status_code=404, detail=f"GitHub user '{clean_username}' not found")
        if user_res.status_code != 200:
            raise HTTPException(status_code=user_res.status_code, detail="GitHub API error")
        
        user_data = user_res.json()

        # 2. Fetch public repos
        repos_res = await client.get(
            f"https://api.github.com/users/{clean_username}/repos?sort=updated&per_page=30",
            headers=headers
        )
        repos_raw = repos_res.json() if repos_res.status_code == 200 else []

    # Map user schema
    user = UserProfileSchema(
        username=user_data.get("login", clean_username),
        name=user_data.get("name") or clean_username,
        title="Full-Stack Developer & Systems Enthusiast",
        avatar=user_data.get("avatar_url", ""),
        bio=user_data.get("bio") or "Passionate computer science student & open-source builder.",
        location=user_data.get("location") or "Bengaluru, India",
        company=user_data.get("company"),
        website=user_data.get("blog") or f"https://github.com/{clean_username}",
        twitter=user_data.get("twitter_username"),
        githubUrl=user_data.get("html_url", f"https://github.com/{clean_username}"),
        followers=user_data.get("followers", 0),
        following=user_data.get("following", 0),
        publicRepos=user_data.get("public_repos", 0),
        totalStars=sum(r.get("stargazers_count", 0) for r in repos_raw),
        availableForWork=True,
    )

    # Filter top non-fork repositories
    filtered_repos = [r for r in repos_raw if not r.get("fork")]
    filtered_repos.sort(key=lambda x: (x.get("stargazers_count", 0), x.get("forks_count", 0)), reverse=True)
    top_repos = filtered_repos[:6]

    color_map = {
        "Python": "#3776AB",
        "C++": "#00599C",
        "TypeScript": "#3178C6",
        "JavaScript": "#F7DF1E",
        "Go": "#00ADD8",
        "Rust": "#DEA584",
        "Java": "#ED8B00",
        "HTML": "#E34F26",
    }

    repositories: List[RepositorySchema] = []
    for r in top_repos:
        lang = r.get("language") or "Code"
        repositories.append(RepositorySchema(
            id=str(r.get("id")),
            name=r.get("name"),
            displayName=r.get("name").replace("-", " ").title(),
            description=r.get("description") or "Open source project on GitHub.",
            language=lang,
            languageColor=color_map.get(lang, "#22d3ee"),
            stars=r.get("stargazers_count", 0),
            forks=r.get("forks_count", 0),
            topics=r.get("topics", []),
            repoUrl=r.get("html_url"),
            liveUrl=r.get("homepage") if r.get("homepage") else None,
            updatedDate=f"Updated {r.get('updated_at', '')[:10]}",
            isPinned=True,
            highlights=[
                f"Built using modern {lang} architecture and best practices",
                f"Starred by {r.get('stargazers_count', 0)} developers worldwide"
            ]
        ))

    # Tech stack extraction
    tech_stack = [
        TechStackItemSchema(name="C++", category="Languages", level="Advanced", badgeColor="#00599C"),
        TechStackItemSchema(name="Python", category="Languages", level="Advanced", badgeColor="#3776AB"),
        TechStackItemSchema(name="TypeScript", category="Languages", level="Advanced", badgeColor="#3178C6"),
        TechStackItemSchema(name="React.js", category="Frontend", level="Advanced", badgeColor="#61DAFB"),
        TechStackItemSchema(name="FastAPI", category="Backend & Cloud", level="Advanced", badgeColor="#009688"),
        TechStackItemSchema(name="PostgreSQL", category="Backend & Cloud", level="Intermediate", badgeColor="#4169E1"),
        TechStackItemSchema(name="Docker", category="Backend & Cloud", level="Intermediate", badgeColor="#2496ED"),
        TechStackItemSchema(name="Git & GitHub Actions", category="Tools & Databases", level="Advanced", badgeColor="#F05032"),
    ]

    readme_markdown = f"""# Hi there, I'm {user.name} 👋
### 🚀 {user.title}

- 🎓 **Education:** {user.degree} @ **{user.college}**
- ⚡ **Looking for:** **SDE Internships & Full-Time Software Engineering Roles (2025/2026)**
- 🌐 **Portfolio:** [{user.username}.gitfolio.me]({user.website})

---

### 📌 Featured Projects
{chr(10).join([f"- [**{repo.displayName}**]({repo.repoUrl}): {repo.description} (`{repo.language}` ⭐ {repo.stars})" for repo in repositories])}

---
⭐ *Generated automatically with [GitFolio Maker](https://gitfolio.me)*
"""

    return PortfolioResponse(
        user=user,
        repositories=repositories,
        techStack=tech_stack,
        readmeMarkdown=readme_markdown
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
