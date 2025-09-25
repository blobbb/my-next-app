import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.local"),
  title: {
    default: "Cole Ward – Network Engineering Portfolio",
    template: "%s | Cole Ward",
  },
  description:
    "Network engineering intern Cole Ward shares infrastructure experience, automation work, and measurable operations wins.",
  keywords: [
    "network engineering",
    "python automation",
    "infrastructure monitoring",
    "computer science student",
    "cole ward",
  ],
  openGraph: {
    title: "Cole Ward – Network Engineering Portfolio",
    description:
      "Explore Cole Ward's network engineering experience, automation projects, and recruiter resources.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.local",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cole Ward – Network Engineering Portfolio",
    description:
      "Automation scripts, monitoring wins, and recruiter-ready experience from Cole Ward.",
  },
  icons: {
    icon: "/websiteLogo.png",
    shortcut: "/websiteLogo.png",
    apple: "/websiteLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-night-900">
      <body className={`${sans.variable} ${mono.variable} min-h-screen bg-night-900`}>{children}</body>
    </html>
  );
}
