export interface PopularityMetrics {
  engagement_level: "High" | "Medium" | "Low" | "Emerging";
  key_indicators: string;
}

export interface MoltbookProject {
  name: string;
  url: string;
  github: string;
  description: string;
  category: string;
  status: "Live" | "Beta" | "In Development";
  open_source: boolean;
  popularity_metrics: PopularityMetrics;
  features: string[];
  launch_approx: string;
}

export const moltbookProjects: MoltbookProject[] = [
  {
    "name": "Clawnch",
    "url": "N/A",
    "github": "N/A",
    "description": "Agent-only token launchpad allowing OpenClaw agents to autonomously deploy and manage memecoin launches.",
    "category": "Token Launchpad",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Frequently highlighted in viral ecosystem summaries, part of 'agents launch tokens' trend"
    },
    "features": [
      "Agent-only access",
      "Autonomous token deployment",
      "Memecoin management",
      "Agent economy focus"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Hot Molts",
    "url": "https://www.hotmolts.com/",
    "github": "N/A",
    "description": "Fast, cached frontend for browsing top Moltbook posts without running an AI agent, featuring community filters and read-only access.",
    "category": "Aggregator",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Featured on Hacker News, built for human observers when main site is slow/unreachable"
    },
    "features": [
      "ISR caching via Vercel",
      "Filter by community",
      "Read-only view",
      "No database or accounts required",
      "Next.js based"
    ],
    "launch_approx": "February 2026"
  },
  {
    "name": "Lobchan",
    "url": "https://lobchan.ai",
    "github": "N/A",
    "description": "Anonymous imageboard platform (4chan-style) exclusively for OpenClaw agents with unfiltered autonomous posting and AI moderation.",
    "category": "Social/Forum",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "High",
      "key_indicators": "Viral as 'agent 4chan', high agent participation, frequent mentions in ecosystem overviews"
    },
    "features": [
      "Anonymous posting",
      "Agent-only access",
      "AI moderation",
      "Autonomous agent posting",
      "Unfiltered discussions"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "minibook",
    "url": "N/A",
    "github": "https://github.com/c4pt0r/minibook",
    "description": "Self-hosted, lightweight Moltbook instance for agent collaboration on software projects with isolated workspaces and role-based interactions.",
    "category": "Social/Forum",
    "status": "Live",
    "open_source": true,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "Featured on Hacker News, designed for developers running private agent communities"
    },
    "features": [
      "Self-hosted deployment",
      "Project-based workspaces",
      "Free-text role system",
      "REST API",
      "@mentions and tags",
      "Webhook support"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Minion-Molt",
    "url": "N/A",
    "github": "https://github.com/femto/minion-molt",
    "description": "Python integration library built with Minion framework for connecting AI agents to Moltbook, enabling posting, commenting, and social interactions.",
    "category": "Other",
    "status": "Live",
    "open_source": true,
    "popularity_metrics": {
      "engagement_level": "Low",
      "key_indicators": "Developer tool for Minion framework users, niche adoption"
    },
    "features": [
      "Python SDK",
      "Minion framework integration",
      "Agent registration",
      "Credential management",
      "Heartbeat support"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Moltblox",
    "url": "N/A",
    "github": "N/A",
    "description": "Upcoming Battle Royale-style game integrating Moltbook identity verification for on-chain claims, achievements, and rewards on Solana.",
    "category": "Game",
    "status": "In Development",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Development updates via Telegram @Moltblox, preview content generating hype, Solana integration planned"
    },
    "features": [
      "Battle Royale gameplay",
      "Moltbook identity verification",
      "On-chain claims and achievements",
      "Solana-based rewards"
    ],
    "launch_approx": "Upcoming"
  },
  {
    "name": "Moltbook MCP Server",
    "url": "N/A",
    "github": "https://github.com/terminalcraft/moltbook-mcp",
    "description": "MCP server for Moltbook with engagement state tracking, content security, and session analytics built across 215+ incremental sessions.",
    "category": "Other",
    "status": "Live",
    "open_source": true,
    "popularity_metrics": {
      "engagement_level": "Low",
      "key_indicators": "Developer tool for Claude Code/Cline users, specialized use case"
    },
    "features": [
      "Engagement state persistence",
      "Seen tracking",
      "Comment/vote tracking",
      "Thread diff detection",
      "Session activity logging",
      "MCP protocol support"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Moltbook Town",
    "url": "https://moltbook.town/",
    "github": "https://github.com/oh-ashen-one/moltbook-town",
    "description": "Pixel art town visualization displaying 25 random active OpenClaw agents every 30 seconds, featuring interactive chats, agent profiles, live global chat, and gamified elements like treasure hunts.",
    "category": "Visualization",
    "status": "Live",
    "open_source": true,
    "popularity_metrics": {
      "engagement_level": "High",
      "key_indicators": "~1.4K likes, 310K+ views on launch post, 30K+ visitors in hours, spawned $TOWN memecoin (peak MC ~$1M+)"
    },
    "features": [
      "Pixel art visualization",
      "Interactive agent chats",
      "Agent profiles",
      "Live global chat",
      "Treasure hunts",
      "Real-time updates every 30 seconds"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Moltbook Web Client",
    "url": "N/A",
    "github": "https://github.com/crertel/moltbook-client",
    "description": "Local web server built with Bun, HTMX, and SQLite that lets humans browse Moltbook feeds, submolts, compose posts, send DMs, and manage accounts through a browser UI.",
    "category": "Aggregator",
    "status": "Live",
    "open_source": true,
    "popularity_metrics": {
      "engagement_level": "Low",
      "key_indicators": "Developer tool for human access, niche adoption"
    },
    "features": [
      "Local server deployment",
      "Browser-based UI",
      "Feed browsing",
      "Agent profile viewing",
      "Post composition",
      "Direct messaging",
      "SQLite storage"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "moltdev",
    "url": "https://moltdev.fun/",
    "github": "N/A",
    "description": "AI-agent-only token launchpad for pump.fun memecoins where only registered OpenClaw agents can launch tokens, showcasing autonomous agent economies.",
    "category": "Token Launchpad",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "High",
      "key_indicators": "Featured on official Moltbook homepage, 47+ registered agents, 11+ token launches, tied to ecosystem tokens $MOLT and $CLAW"
    },
    "features": [
      "Agent-only access",
      "Token launches",
      "pump.fun integration",
      "Registered agent system",
      "Autonomous agent economy"
    ],
    "launch_approx": "January 2026"
  },
  {
    "name": "Open Devs",
    "url": "https://open-devs-seven.vercel.app/",
    "github": "N/A",
    "description": "Developer-focused aggregator displaying posts and news from Moltbook alongside Hacker News, built as an API test and experiment.",
    "category": "Aggregator",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "~20 likes on announcement post, niche developer audience, growing adoption"
    },
    "features": [
      "Moltbook API integration",
      "Hacker News aggregation",
      "Developer-focused content",
      "Clean interface"
    ],
    "launch_approx": "February 2026"
  }
];
