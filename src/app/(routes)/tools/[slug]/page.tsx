import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";
import { getAllTools, getToolBySlug } from "@/lib/tools";

interface ToolPageProps {
  params: { slug: string };
}

const ToolPreview = dynamic(() => import("@/components/ui/ToolPreview"), {
  ssr: false,
  loading: () => (
    <div className="flex h-48 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-400">
      Loading tool preview…
    </div>
  ),
});

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found",
    };
  }

  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <PageLayout>
      <Section className="space-y-6">
        <Link href="/tools" className="text-sm text-cyan-200 hover:text-white">
          ← Back to tools
        </Link>
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {tool.category}
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {tool.title}
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">{tool.description}</p>
        </div>
      </Section>

      <Section className="space-y-6">
        <GlowCard className="p-8">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">Overview</h2>
          <p className="mt-3 text-sm text-slate-300">
            This tool is bundled with the project so you can extend it, wire in
            bespoke inputs, or embed it inside MDX-powered guides.
          </p>
        </GlowCard>

        <ToolPreview slug={tool.slug} component={tool.component} />
      </Section>
    </PageLayout>
  );
}
