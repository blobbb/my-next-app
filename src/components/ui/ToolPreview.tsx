"use client";

import { Suspense, lazy, useMemo } from "react";

interface ToolPreviewProps {
  slug: string;
  component: string;
}

function createLazyTool(component: string) {
  return lazy(async () => {
    try {
      const mod = await import(`@/content/tools/${component}`);
      return { default: mod.default };
    } catch (error) {
      console.error("Unable to load tool component", component, error);
      return {
        default: () => (
          <div className="flex h-48 items-center justify-center rounded-3xl border border-red-400/40 bg-red-500/10 text-sm text-red-200">
            Failed to load tool component.
          </div>
        ),
      };
    }
  });
}

export default function ToolPreview({ slug, component }: ToolPreviewProps) {
  const ToolComponent = useMemo(() => createLazyTool(component), [component]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">
        Live playground
      </h2>
      <Suspense
        fallback={
          <div className="mt-4 flex h-48 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-night-800/50 text-sm text-slate-400">
            Loading {slug}…
          </div>
        }
      >
        <div className="mt-4">
          <ToolComponent />
        </div>
      </Suspense>
    </div>
  );
}
