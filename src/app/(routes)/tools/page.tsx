import Link from "next/link";
import type { Route } from "next";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";
import { getAllTools } from "@/lib/tools";

export const metadata = {
  title: "Tools",
  description:
    "Automation helpers, gradient generators, and reporting templates Cole Ward uses while supporting network operations.",
};

export default async function ToolsPage() {
  const tools = await getAllTools();

  return (
    <PageLayout>
      <Section className="space-y-8">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Workflow Toolkit
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-5xl md:leading-tight">
            Utilities that keep network operations visible and repeatable.
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            These demos mirror the scripts and templates I lean on: from quick gradient builders for presentations to Python notebooks that analyze alerts, and reporting docs that translate incidents for leadership.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Network Ops",
              detail: "Checklists, runbook snippets, and data pulls that speed up on-call coordination across hybrid networks.",
            },
            {
              label: "Automation",
              detail: "Python scripts and notebooks that clean alert data, test config changes, and surface trends for follow-up.",
            },
            {
              label: "Storytelling",
              detail: "Gradient visuals and reporting templates that help leadership understand what happened and why it matters.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {item.label}
              </span>
              <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="space-y-10">
        {tools.length === 0 ? (
          <GlowCard className="p-10 text-center text-slate-300">
            <p className="text-lg font-semibold text-white">No tools configured</p>
            <p className="mt-2 text-sm">
              Add tool definitions in <code className="rounded bg-white/5 px-2 py-1">src/content/tools</code> to showcase your utilities.
            </p>
          </GlowCard>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <GlowCard
                key={tool.slug}
                as={Link}
                href={(`/tools/${tool.slug}`) as Route}
                glow={tool.featured ? "magenta" : "cyan"}
                className="group flex h-full flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    {tool.category}
                  </span>
                  {tool.featured ? (
                    <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-white">
                      Featured
                    </span>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">{tool.title}</h2>
                  <p className="text-sm text-slate-300">{tool.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
                  <span>{tool.featured ? "Signature" : "Available"}</span>
                  <span className="inline-flex items-center gap-2 text-cyan-200">
                    Launch
                    <span aria-hidden className="text-base">↗</span>
                  </span>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
