import { toolConfigSchema } from "@/lib/schemas";
import type { ToolConfig } from "@/types/content";

async function loadRegistry(): Promise<ToolConfig[]> {
  try {
    const { toolRegistry } = await import("@/content/tools/registry");
    return toolRegistry;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Tool registry missing:", error);
    }
    return [];
  }
}

function validateTools(tools: ToolConfig[]): ToolConfig[] {
  const seen = new Set<string>();
  return tools.map((tool) => {
    const parsed = toolConfigSchema.parse(tool);
    if (seen.has(parsed.slug)) {
      throw new Error(`Duplicate tool slug detected: ${parsed.slug}`);
    }
    seen.add(parsed.slug);
    return parsed;
  });
}

export async function getAllTools(): Promise<ToolConfig[]> {
  const registry = await loadRegistry();
  const tools = validateTools(registry);
  return tools.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getFeaturedTools(): Promise<ToolConfig[]> {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.featured);
}

export async function getToolBySlug(slug: string): Promise<ToolConfig | null> {
  const tools = await getAllTools();
  return tools.find((tool) => tool.slug === slug) ?? null;
}
