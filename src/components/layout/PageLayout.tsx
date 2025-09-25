import type { ReactNode } from "react";
import { FloatingNavbar } from "@/components/navigation/FloatingNavbar";

interface PageLayoutProps {
  children: ReactNode;
  background?: ReactNode;
}

export function PageLayout({ children, background }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-night-900 text-slate-100">
      {background ?? <DefaultBackground />}
      <FloatingNavbar />
      <main className="relative pt-32 pb-12 md:pb-24">{children}</main>
      <footer className="relative mx-auto w-full max-w-5xl px-4 pb-10 text-xs text-slate-500">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Cole Ward. Built for reliability.</span>
          <span className="text-slate-600">
            Built with Next.js 14, Tailwind CSS, and a glowing touch.
          </span>
        </div>
      </footer>
    </div>
  );
}

function DefaultBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(55,248,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,63,240,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.04) 0%,rgba(4,8,16,0.2) 45%,rgba(255,255,255,0.05) 100%)] mix-blend-screen opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0,rgba(5,6,10,0.85)_65%,rgba(5,6,10,1)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night-900 via-night-900/60 to-transparent" />
    </div>
  );
}
