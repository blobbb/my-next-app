import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";
import { MDXRenderer } from "@/components/mdx";
import { getAllProjects, getProjectBySlug, getProjectContent } from "@/lib/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = await getProjectContent(slug);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;

  return (
    <PageLayout>
      <Section className="space-y-6">
        <Link href="/projects" className="text-sm text-cyan-200 hover:text-white">
          ← Back to projects
        </Link>
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {new Date(meta.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
            })}
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {meta.title}
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">{meta.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            {meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-cyan-200">
            {meta.demo ? (
              <a href={meta.demo} target="_blank" rel="noreferrer" className="hover:text-white">
                Launch demo →
              </a>
            ) : null}
            {meta.github ? (
              <a href={meta.github} target="_blank" rel="noreferrer" className="hover:text-white">
                View source →
              </a>
            ) : null}
          </div>
        </div>
      </Section>

      <Section>
        <GlowCard className="p-2 md:p-4">
          <MDXRenderer>{content}</MDXRenderer>
        </GlowCard>
      </Section>
    </PageLayout>
  );
}
