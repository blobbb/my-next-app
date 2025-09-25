"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NAV_ITEMS } from "@/lib/navigation";

export function FloatingNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center px-4 pt-6">
      <nav
        className={clsx(
          "group relative w-full max-w-4xl overflow-hidden rounded-full border px-4 py-2.5 backdrop-blur transition-all duration-500 ease-out",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_top,rgba(55,248,255,0.25),transparent_65%)] before:opacity-0 before:transition-opacity before:duration-500",
          "after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-full after:bg-[conic-gradient(from_120deg,rgba(55,248,255,0.55),rgba(255,63,240,0.4),rgba(55,248,255,0.55))] after:opacity-0 after:blur-xl after:transition-opacity after:duration-500",
          "shadow-[0_0_25px_rgba(55,248,255,0.18)] bg-night-900/55 border-white/15",
          isScrolled && "border-cyan-400/40 shadow-[0_0_35px_rgba(55,248,255,0.35)]",
          "group-hover:before:opacity-100 group-hover:after:opacity-100 group-hover:-translate-y-0.5 group-hover:scale-[1.02]"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white"
          >
            Cole Ward
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              aria-hidden
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out",
                  pathname === item.href
                    ? "text-white shadow-[0_0_25px_rgba(55,248,255,0.45)]"
                    : "text-slate-300 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(55,248,255,0.25)]"
                )}
              >
                {pathname === item.href && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_18px_rgba(55,248,255,0.4)] transition duration-300"></span>
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {isOpen ? (
          <div className="mt-3 flex flex-col gap-2 md:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
                  pathname === item.href
                    ? "bg-cyan-400/10 text-white shadow-[0_0_20px_rgba(55,248,255,0.45)]"
                    : "text-slate-300 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(55,248,255,0.25)]"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
