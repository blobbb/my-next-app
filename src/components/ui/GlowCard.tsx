import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type GlowCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  glow?: "cyan" | "magenta" | "amber";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function GlowCard<T extends ElementType = "div">({
  as,
  glow = "cyan",
  className,
  children,
  ...props
}: GlowCardProps<T>) {
  const Component = as ?? "div";
  const glowColor = {
    cyan: "shadow-[0_0_60px_rgba(55,248,255,0.2)] border-cyan-400/30",
    magenta: "shadow-[0_0_60px_rgba(255,63,240,0.2)] border-pink-400/30",
    amber: "shadow-[0_0_60px_rgba(255,179,71,0.2)] border-amber-400/30",
  }[glow];

  return (
    <Component
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl transition",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_55%)]",
        "hover:before:opacity-100",
        glowColor,
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </Component>
  );
}
