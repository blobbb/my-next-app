import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28",
        "scroll-m-24",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 -z-10 rounded-[2.5rem] border border-white/20"
        style={{
          backdropFilter: "blur(40px)",
          maskImage:
            "radial-gradient(70% 70% at 50% 0%, rgba(0,0,0,0.35), transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-10 -z-10 h-64 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(55, 248, 255, 0.25), transparent 65%)",
        }}
      />
      {children}
    </section>
  );
}
