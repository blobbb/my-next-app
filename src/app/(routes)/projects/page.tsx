import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description:
    "Network operations stories, automation dashboards, and community analytics that show how Cole Ward tackles real problems.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageLayout>
      <Section className="space-y-8">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Field Notes
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-5xl md:leading-tight">
            Hands-on projects that keep people connected and supported.
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            From automating network reports at Nsight to analysing mentorship data for Big Brothers Big Sisters, these case studies show how I combine scripting, communication, and empathy.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[ 
            {
              label: "Network Response",
              stat: "Incident Stories",
              copy: "Dashboards and runbooks that cut through noise so engineers can restore hybrid fiber-wireless service faster.",
            },
            {
              label: "Data Storytelling",
              stat: "Community Impact",
              copy: "Machine learning research delivered to Big Brothers Big Sisters, highlighting predictors of long-lasting mentor matches.",
            },
            {
              label: "Automation",
              stat: "Python + Cloud",
              copy: "Scripts and workers that summarize alerts, prep stakeholder reports, and keep my team aligned.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {item.label}
              </span>
              <p className="mt-3 text-xl font-semibold text-white">{item.stat}</p>
              <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="space-y-10">
        {projects.length === 0 ? (
          <GlowCard className="p-10 text-center text-slate-300">
            <p className="text-lg font-semibold text-white">No projects yet</p>
            <p className="mt-2 text-sm">
              Add MDX files to <code className="rounded bg-white/5 px-2 py-1">src/content/projects</code> to publish case studies.
            </p>
          </GlowCard>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <GlowCard
                key={project.slug}
                as={Link}
                href={(`/projects/${project.slug}`) as Route}
                className="group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent transition group-hover:scale-105" />
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} cover`}
                      fill
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      priority={project.featured}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
                      No cover image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm text-slate-300">{project.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
                    <span>{project.readingTime}</span>
                    <span className="inline-flex items-center gap-2 text-cyan-200">
                      View Study
                      <span aria-hidden className="text-base">↗</span>
                    </span>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
