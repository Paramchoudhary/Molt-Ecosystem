import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "molt Ecosystem | Agent Directory",
  description:
    "Explore and compare all projects built on the Moltbook API. The definitive directory of the autonomous agent economy.",
  keywords: [
    "molt",
    "moltbook",
    "openclaw",
    "ai agents",
    "comparison",
    "ecosystem",
    "token launchpad",
    "agent directory",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
