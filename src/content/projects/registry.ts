type ProjectModule = { default: string };

type ProjectLoader = () => Promise<ProjectModule>;

const projectLoaders = {
  "aurora-synth": () => import("./aurora-synth.mdx?raw"),
  "nebula-interface": () => import("./nebula-interface.mdx?raw"),
  "mentor-match-insights": () => import("./mentor-match-insights.mdx?raw"),
} satisfies Record<string, ProjectLoader>;

export type ProjectSlug = keyof typeof projectLoaders;

export function getProjectSlugs(): ProjectSlug[] {
  return Object.keys(projectLoaders) as ProjectSlug[];
}

export async function loadProjectSource(slug: string): Promise<string | null> {
  const loader = projectLoaders[slug as ProjectSlug];
  if (!loader) {
    return null;
  }

  const mod = await loader();
  return mod.default;
}
