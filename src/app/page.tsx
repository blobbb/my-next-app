import dynamic from "next/dynamic";
import Link from "next/link";
import { PageLayout, Section } from "@/components/layout";
import { GlowCard } from "@/components/ui";

const InteractiveCircle = dynamic(
  () =>
    import("@/components/three/InteractiveCircle").then(
      (mod) => mod.InteractiveCircle
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full max-w-lg animate-pulse rounded-3xl bg-white/5" />
    ),
  }
);

export default function HomePage() {
  return (
    <PageLayout>
      <Section
        id="hero"
        className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300">
              Network Engineering Intern · UW-Platteville CS & Data Analytics
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl md:leading-[1.05]">
              Keeping hybrid fiber-wireless networks reliable—and recruiter ready.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 md:text-xl">
              I support Nsight&#39;s core infrastructure by triaging alerts, coordinating field fixes, and prototyping Python automations while maintaining a 3.7 GPA in Computer Science and Data Analytics. Earlier roles in logistics and customer support sharpened the documentation and communication that keep teams aligned under pressure.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-medium text-cyan-200 shadow-glow transition hover:-translate-y-0.5 hover:text-white"
            >
              View Projects
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-medium text-slate-200 transition hover:border-white/40 hover:text-white"
            >
              View Resume
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlowCard className="p-6">
              <h2 className="text-lg font-semibold text-white">Network Operations</h2>
              <p className="mt-2 text-sm text-slate-300">
                Support 24/7 monitoring across Northeast Wisconsin by validating alerts, coordinating dispatch, and documenting fixes that shorten mean-time-to-resolution.
              </p>
            </GlowCard>
            <GlowCard glow="magenta" className="p-6">
              <h2 className="text-lg font-semibold text-white">Automation & Scripting</h2>
              <p className="mt-2 text-sm text-slate-300">
                Prototype Python utilities that streamline configuration updates and replace repetitive workflows uncovered during on-call rotations.
              </p>
            </GlowCard>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <InteractiveCircle />
        </div>
      </Section>

      <Section className="grid gap-6 md:grid-cols-2">
        <GlowCard className="flex h-full flex-col justify-between gap-4 p-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-200">
              Machine Learning Coursework
            </span>
            <h2 className="text-2xl font-semibold text-white">
              Applying supervised models to real mentorship data sets.
            </h2>
            <p className="text-sm text-slate-300">
              Current semester highlights include model evaluation, feature engineering, and communicating findings to non-technical partners. Coursework mirrors the tooling used on Nsight automations and the Big Brothers Big Sisters analysis work.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>Focus: regression, classification, explainability</span>
          </div>
        </GlowCard>
        <GlowCard glow="magenta" className="flex h-full flex-col justify-between gap-4 p-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-pink-200">
              Mentor Match Analytics
            </span>
            <h2 className="text-2xl font-semibold text-white">
              Predicting match longevity for Minnesota Big Brothers Big Sisters.
            </h2>
            <p className="text-sm text-slate-300">
              Designed clustering and predictive dashboards to recommend adult mentors, highlighting factors that improve long-term relationships. Presented insights to program coordinators to refine pairing criteria.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>Result: higher match confidence & actionable predictors</span>
          </div>
        </GlowCard>
      </Section>

      <Section className="space-y-12">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Recruiter Resources
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Everything you need to evaluate impact quickly.
          </h2>
          <p className="max-w-2xl text-slate-300">
            Review shipped work, skim an ATS-ready resume, and explore hands-on tools that show how I communicate incidents, updates, and ROI to technical and non-technical audiences.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <GlowCard
            as={Link}
            href="/projects"
            className="group flex h-full flex-col justify-between p-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
                Projects
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm transition group-hover:translate-x-1"
                >
                  ↗
                </span>
              </span>
              <h3 className="text-xl font-semibold text-white">
                Case studies linking infrastructure work to business outcomes.
              </h3>
              <p className="text-sm text-slate-300">
                Includes monitoring runbooks, shipping process improvements, and prototypes that demonstrate how I translate root-cause and ROI for stakeholders.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>See the archive</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px]">
                2 min preview
              </span>
            </div>
          </GlowCard>
          <GlowCard
            as={Link}
            href="/resume"
            glow="magenta"
            className="group flex h-full flex-col justify-between p-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-pink-200">
                Resume
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-pink-400/40 bg-pink-500/10 text-sm transition group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </span>
              <h3 className="text-xl font-semibold text-white">
                Interactive CV with quantified accomplishments and tooling.
              </h3>
              <p className="text-sm text-slate-300">
                Summaries highlight 24/7 network support, 98% fulfillment accuracy, logistics process redesigns, and the 3.7 GPA behind my dual major.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Download-ready</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px]">
                Updated quarterly
              </span>
            </div>
          </GlowCard>
          <GlowCard
            as={Link}
            href="/tools"
            glow="amber"
            className="group flex h-full flex-col justify-between p-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-200">
                Tools
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-sm transition group-hover:translate-y-0.5"
                >
                  ↗
                </span>
              </span>
              <h3 className="text-xl font-semibold text-white">
                Utilities that translate complex work for stakeholders.
              </h3>
              <p className="text-sm text-slate-300">
                Demos mirror how I guide teammates through incident notes, technical diagrams, and process updates without losing clarity.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Built for teams</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px]">
                New drops monthly
              </span>
            </div>
          </GlowCard>
        </div>
      </Section>

      <Section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
            How I Deliver Value
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Pairing dependable operations with clear communication.
          </h2>
          <p className="max-w-2xl text-lg text-slate-300">
            I bring frontline support experience, scripting, and customer-facing empathy to every team. Whether coordinating technicians, reorganizing shipping docks, or meeting pharmacy accuracy checks, the goal stays the same - keep services available and people informed.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Network Response",
                description:
                  "Assist with 24/7 monitoring, ticket triage, and dispatch notes that help engineers restore service faster across hybrid fiber-wireless networks.",
              },
              {
                title: "Process Improvements",
                description:
                  "Redesigned shipping, assembly, and retail workflows to improve throughput before transitioning into infrastructure support.",
              },
              {
                title: "Customer Accuracy",
                description:
                  "Delivered 98% accurate pharmacy and online orders while communicating wait times and resolving issues in real time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <h3 className="text-sm font-semibold tracking-[0.2em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <GlowCard className="flex h-full flex-col justify-between gap-6 p-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-200">
              At a glance
            </span>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <span className="text-4xl font-semibold">24/7</span>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Network coverage supported
                </p>
              </div>
              <div>
                <span className="text-4xl font-semibold">98%</span>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Order accuracy maintained
                </p>
              </div>
              <div>
                <span className="text-4xl font-semibold">3.7</span>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  GPA · CS & Data Analytics
                </p>
              </div>
              <div>
                <span className="text-4xl font-semibold">5</span>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Roles across ops & support
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-300">
            Currently expanding Python automation for configuration updates and deepening network troubleshooting skills while staying active in campus rugby, cybersecurity, and innovation communities.
          </p>
        </GlowCard>
      </Section>
    </PageLayout>
  );
}
