import matter from "gray-matter";
import { projectFrontmatterSchema } from "@/lib/schemas";
import { readingTimeMinutes } from "@/lib/readingTime";
import { renderMdx } from "@/lib/mdx";
import type { ProjectFrontmatter, ProjectMeta } from "@/types/content";
import { getProjectSlugs, loadProjectSource } from "@/content/projects/registry";

function toMeta(slug: string, frontmatter: ProjectFrontmatter, content: string): ProjectMeta {
  return {
    ...frontmatter,
    slug,
    readingTime: readingTimeMinutes(content),
  };
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const slugs = getProjectSlugs();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const source = await loadProjectSource(slug);
      if (!source) {
        throw new Error(`Project source not found for slug: ${slug}`);
      }
      const { data, content } = matter(source);
      const parsed = projectFrontmatterSchema.safeParse(data);

      if (!parsed.success) {
        const errorMessage = parsed.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");
        throw new Error(`Invalid frontmatter in ${slug}.mdx – ${errorMessage}`);
      }

      return toMeta(slug, parsed.data as ProjectFrontmatter, content);
    })
  );

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<ProjectMeta | null> {
  const source = await loadProjectSource(slug);
  if (!source) {
    return null;
  }

  const { data, content } = matter(source);
  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`Invalid frontmatter in ${slug}.mdx – ${errorMessage}`);
  }

  return toMeta(slug, parsed.data as ProjectFrontmatter, content);
}

export async function getProjectContent(slug: string) {
  const source = await loadProjectSource(slug);
  if (!source) {
    return null;
  }

  const { data, content } = matter(source);
  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessage = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`Invalid frontmatter in ${slug}.mdx – ${errorMessage}`);
  }

  const mdxContent = await renderMdx(content);

  return {
    meta: toMeta(slug, parsed.data as ProjectFrontmatter, content),
    content: mdxContent,
  };
}
