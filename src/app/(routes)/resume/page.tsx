import Link from "next/link";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";
import { getResume } from "@/lib/resume";

export const metadata = {
  title: "Resume",
  description:
    "Resume for Cole Ward – Nsight network engineering intern with Python automation experience, 24/7 monitoring support, and a 3.7 GPA in Computer Science & Data Analytics.",
};

export default async function ResumePage() {
  const resume = await getResume();
  const experience = resume?.experience ?? [];
  const skills = resume?.skills ?? [];
  const personal = resume?.personal;
  const education = resume?.education ?? [];
  const primaryEducation = education[0];

  return (
    <PageLayout>
      <Section className="space-y-10">
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Resume
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-5xl md:leading-tight">
            Cole Ward – Network engineering intern focused on reliability and automation.
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            I help keep Nsight&#39;s hybrid fiber-wireless network stable by triaging alerts, coordinating field responses, and drafting Python scripts to streamline configuration updates. Previous roles in logistics, assembly, and retail achieved 98% fulfillment accuracy and faster dock turnarounds, all while maintaining a 3.7 GPA in Computer Science and Data Analytics at UW-Platteville.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          {personal?.email ? (
            <Link
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 font-medium text-cyan-200 shadow-glow transition hover:-translate-y-0.5 hover:text-white"
            >
              Email
              <span aria-hidden className="text-base">↗</span>
            </Link>
          ) : null}
          <a
            href="/Cole-Ward-Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
          >
            Download PDF
            <span aria-hidden className="text-base">&darr;</span>
          </a>
          {personal?.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-slate-200 transition hover:border-white/40 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <span aria-hidden className="text-base">↗</span>
            </a>
          ))}
        </div>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <GlowCard className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Experience</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Career Snapshot
            </span>
          </div>
          <div className="mt-8 space-y-8">
            {experience.length ? (
              experience.map((item, index) => (
                <div key={`${item.company}-${item.role}`} className="relative pl-8">
                  <span className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
                  <span className="absolute left-0 top-1 flex h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(55,248,255,0.6)]" />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                        {item.start} — {item.end}
                      </span>
                      <h3 className="text-lg font-semibold text-white">
                        {item.role} · {item.company}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300">
                      {item.achievements?.join(" · ") ?? "Add achievements to highlight impact."}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      {item.tech.map((tech) => (
                        <span key={`${item.company}-${tech}`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  {index !== experience.length - 1 ? (
                    <span className="absolute left-0 bottom-0 h-3 w-px bg-gradient-to-b from-white/10 to-transparent" />
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-300">
                Experience details will appear once your resume JSON is added to
                <code className="ml-1 rounded bg-white/5 px-2 py-1">src/content/resume</code>.
              </p>
            )}
          </div>
        </GlowCard>

        <div className="space-y-6">
          <GlowCard className="p-8">
            <h2 className="text-xl font-semibold text-white">Core Skills</h2>
            <p className="mt-2 text-sm text-slate-300">
              Strengths span networking and infrastructure support, Python automation, and data storytelling—grounded in hands-on roles and a data analytics curriculum.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              {skills.length ? (
                skills.flatMap((category) =>
                  category.skills.map((skill) => (
                    <span
                      key={`${category.category}-${skill}`}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em]"
                    >
                      {skill}
                    </span>
                  ))
                )
              ) : (
                <span>
                  Add skill categories to <code className="rounded bg-white/5 px-2 py-1">resume.json</code> to showcase your stack.
                </span>
              )}
            </div>
          </GlowCard>

          <GlowCard className="p-8">
            <h2 className="text-xl font-semibold text-white">Personal</h2>
            {personal ? (
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Currently
                  </span>
                  <p className="mt-2 text-white">{personal.summary}</p>
                </div>
                <div className="grid gap-2 text-slate-300">
                  <span className="font-semibold text-white">{personal.name}</span>
                  <span>{personal.title}</span>
                  <span>{personal.location}</span>
                  {primaryEducation ? (
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      <div>{primaryEducation.institution}</div>
                      <div>{primaryEducation.degree}</div>
                      {primaryEducation.details?.length ? (
                        <div>{primaryEducation.details.join(" · ")}</div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-300">
                Add <code className="rounded bg-white/5 px-2 py-1">resume.json</code> to personalize this section.
              </p>
            )}
          </GlowCard>
        </div>
      </Section>
    </PageLayout>
  );
}
