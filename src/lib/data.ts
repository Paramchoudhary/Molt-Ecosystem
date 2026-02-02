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
  color?: string;
}

export const moltbookProjects: MoltbookProject[] = [
  // Original Projects
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
    "launch_approx": "January 2026",
    "color": "#FF6B6B"
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
    "launch_approx": "February 2026",
    "color": "#FFD93D"
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
    "launch_approx": "January 2026",
    "color": "#6BCB77"
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
    "launch_approx": "January 2026",
    "color": "#4D96FF"
  },
  {
    "name": "Minion-Molt",
    "url": "N/A",
    "github": "https://github.com/femto/minion-molt",
    "description": "Python integration library built with Minion framework for connecting AI agents to Moltbook, enabling posting, commenting, and social interactions.",
    "category": "Developer Tools",
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
    "launch_approx": "January 2026",
    "color": "#9B59B6"
  },
  {
    "name": "Moltblox",
    "url": "N/A",
    "github": "N/A",
    "description": "Upcoming Battle Royale-style game integrating Moltbook identity verification for on-chain claims, achievements, and rewards on Solana.",
    "category": "Gaming",
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
    "launch_approx": "Upcoming",
    "color": "#FF8C00"
  },
  {
    "name": "Moltbook MCP Server",
    "url": "N/A",
    "github": "https://github.com/terminalcraft/moltbook-mcp",
    "description": "MCP server for Moltbook with engagement state tracking, content security, and session analytics built across 215+ incremental sessions.",
    "category": "Developer Tools",
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
    "launch_approx": "January 2026",
    "color": "#00CED1"
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
    "launch_approx": "January 2026",
    "color": "#FF69B4"
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
    "launch_approx": "January 2026",
    "color": "#32CD32"
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
    "launch_approx": "February 2026",
    "color": "#1E90FF"
  },

  // New Projects
  {
    "name": "molt.chess",
    "url": "https://chess.unabotter.xyz",
    "github": "N/A",
    "description": "An ELO-ranked correspondence chess league exclusively for AI agents. No humans or traditional engines allowed—just autonomous agent minds competing across tiers from Wood to Summit.",
    "category": "Gaming",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "Listed in major agent directory (claw.direct); dedicated agent-only chess competition with ranked play."
    },
    "features": [
      "ELO ranking system",
      "Correspondence-style games",
      "Agent-only participation",
      "Tier progression (Wood to Summit)"
    ],
    "launch_approx": "January/February 2026",
    "color": "#8B4513"
  },
  {
    "name": "molt_line",
    "url": "N/A",
    "github": "N/A",
    "description": "Private messaging service built on XMTP for OpenClaw AI agents, enabling direct one-to-one encrypted communication.",
    "category": "Messaging",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Frequently mentioned in ecosystem overviews; agents actively sharing links and signing up for private chats (@molt_line handle)."
    },
    "features": [
      "Private encrypted messaging",
      "XMTP infrastructure",
      "Agent-to-agent direct communication"
    ],
    "launch_approx": "January/February 2026",
    "color": "#7B68EE"
  },
  {
    "name": "molt.space",
    "url": "https://molt.space",
    "github": "N/A",
    "description": "A 3D virtual world for AI agents featuring a lobby with customizable VRM avatars and text-to-speech voice interaction. Built quickly as a forked Hyperfy project.",
    "category": "Virtual World",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "Featured in claw.direct directory; noted for rapid development (built in 11 hours)."
    },
    "features": [
      "3D spatial lobby",
      "Customizable VRM avatars",
      "Text-to-speech voice",
      "Agent social interaction"
    ],
    "launch_approx": "January/February 2026",
    "color": "#20B2AA"
  },
  {
    "name": "moltdev",
    "url": "https://moltdev.fun/",
    "github": "N/A",
    "description": "The first AI-agent-only token launchpad for pump.fun memecoins on Solana. Only verified OpenClaw agents can launch tokens; humans cannot directly participate.",
    "category": "Token Launchpad",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "High",
      "key_indicators": "11 coins launched; 47 registered agents; historical significance as first agent-only launchpad (first launch Jan 31, 2026)."
    },
    "features": [
      "Agent-exclusive token launches",
      "Skill.md integration for agent registration",
      "Solana wallet support for agents",
      "pump.fun integration"
    ],
    "launch_approx": "January 2026",
    "color": "#00FF00"
  },
  {
    "name": "moltlaunch",
    "url": "https://moltlaunch.com",
    "github": "N/A",
    "description": "CLI-based token launchpad on Base chain designed for AI agents. Enables one-command token launches with no gas or wallet setup required for the operator; agents earn perpetual trading fees.",
    "category": "Token Launchpad",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Community posts encouraging agent usage; positioned as local-first and platform-agnostic tool for Moltbook agents."
    },
    "features": [
      "Single-command token launches",
      "No gas/wallet setup needed",
      "Perpetual fee earnings",
      "Agent-focused CLI",
      "Base chain support"
    ],
    "launch_approx": "January/February 2026",
    "color": "#0052FF"
  },
  {
    "name": "MoltOverflow",
    "url": "https://moltoverflow.com",
    "github": "N/A",
    "description": "Stack Overflow-style Q&A platform for coding agents and developers. Agents share verified solutions, root causes, and lessons learned in structured technical posts.",
    "category": "Forum / Knowledge Base",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "Active recent posts (last 24 hours); listed in claw.direct; technical depth but currently low vote engagement."
    },
    "features": [
      "Structured Q&A format",
      "Review and auto-post modes via API keys",
      "Tagging system",
      "Human oversight options"
    ],
    "launch_approx": "January/February 2026",
    "color": "#F48024"
  },
  {
    "name": "Moltroad",
    "url": "https://moltroad.com",
    "github": "N/A",
    "description": "Autonomous agent-only marketplace and skill directory where AI agents trade data, compute, skills, documents, and digital assets using a credit system with escrow protection.",
    "category": "Marketplace",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "159 agents, 580 listings, 28 trades, 1016 credits volume; real-time activity feed with ongoing testing and emerging real trades."
    },
    "features": [
      "Escrow-protected trades",
      "Credit-based economy",
      "Bounties and quests",
      "Shoutbox and activity feed",
      "Skill.md API integration",
      "Observer mode for humans"
    ],
    "launch_approx": "January/February 2026",
    "color": "#DC143C"
  },
  {
    "name": "MoltX",
    "url": "https://moltx.io",
    "github": "N/A",
    "description": "Twitter/X-style social network exclusively for AI agents to post short thoughts, follow others, and participate in trending discussions.",
    "category": "Social Media",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "Active agent profiles and posts; listed in claw.direct; competing with other agent X analogs like Clawk."
    },
    "features": [
      "Short-form posting",
      "Follow system",
      "Trending discussions",
      "Agent-only participation"
    ],
    "launch_approx": "January 2026",
    "color": "#1DA1F2"
  },
  {
    "name": "Retake",
    "url": "https://retake.tv",
    "github": "N/A",
    "description": "Twitch-like streaming platform for agents with human audience. Comes with token that agents can earn trading fees from.",
    "category": "Social Media",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Medium",
      "key_indicators": "First agent streaming platform."
    },
    "features": [
      "Browser-based UI",
      "Earn trading fees",
      "Live stream",
      "Live text chat with audience"
    ],
    "launch_approx": "February 2026",
    "color": "#9146FF"
  },
  {
    "name": "RentAHuman",
    "url": "https://rentahuman.ai",
    "github": "N/A",
    "description": "Marketplace where AI agents can hire humans for physical-world tasks via MCP protocol. Humans set rates and get paid in crypto for meatspace work that AI can't do.",
    "category": "Marketplace",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "High",
      "key_indicators": "94 human signups in first 2 days, trending on Moltbook, active MCP integrations"
    },
    "features": [
      "MCP server integration for AI agents",
      "REST API for bookings and messaging",
      "Crypto wallet payments (ETH, SOL, BTC, USDC)",
      "Human profiles with skills and availability",
      "Agent-to-human messaging system",
      "Review and rating system",
      "Real-time signup growth tracking",
      "Next.js + Firebase + Vercel stack"
    ],
    "launch_approx": "February 2026",
    "color": "#FF4500"
  },
  {
    "name": "ClawdsList",
    "url": "https://clawdslist.com",
    "github": "https://github.com/charlescushman06-cell/clawdslist",
    "description": "Bot-native AI to AI marketplace where autonomous agents post tasks, discover services, negotiate terms, and transact directly without human intermediaries.",
    "category": "Marketplace",
    "status": "Live",
    "open_source": false,
    "popularity_metrics": {
      "engagement_level": "Emerging",
      "key_indicators": "Active agent testing, early developer adoption, first-mover in bot-native marketplaces"
    },
    "features": [
      "AI to AI task marketplace",
      "Autonomous agent negotiation",
      "On-chain settlement",
      "Bot-native identity and reputation",
      "Task routing and discovery APIs",
      "Programmatic escrow"
    ],
    "launch_approx": "January 2026",
    "color": "#FFD700"
  }
];

// Helper functions
export const getCategories = (): string[] => {
  return [...new Set(moltbookProjects.map(p => p.category))].sort();
};

export const getStatuses = (): ("Live" | "Beta" | "In Development")[] => {
  return [...new Set(moltbookProjects.map(p => p.status))] as ("Live" | "Beta" | "In Development")[];
};

export const getEngagementLevels = (): ("High" | "Medium" | "Low" | "Emerging")[] => {
  return ["High", "Medium", "Low", "Emerging"];
};

export const getProjectsByCategory = (category: string): MoltbookProject[] => {
  return moltbookProjects.filter(p => p.category === category);
};

export const getStats = () => {
  const total = moltbookProjects.length;
  const byCategory = moltbookProjects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byStatus = moltbookProjects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byEngagement = moltbookProjects.reduce((acc, p) => {
    acc[p.popularity_metrics.engagement_level] = (acc[p.popularity_metrics.engagement_level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const openSource = moltbookProjects.filter(p => p.open_source).length;
  const closedSource = total - openSource;
  
  return {
    total,
    byCategory,
    byStatus,
    byEngagement,
    openSource,
    closedSource,
    openSourcePercent: Math.round((openSource / total) * 100),
  };
};

// Get favicon URL for a project
export const getFaviconUrl = (url: string): string | null => {
  if (url === "N/A" || url.includes("N/A")) return null;
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
};
