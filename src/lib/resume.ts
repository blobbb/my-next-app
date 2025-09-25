import { resumeSchema } from "@/lib/schemas";
import type { ResumeData } from "@/types/content";

export async function getResume(): Promise<ResumeData | null> {
  try {
    const resumeModule = await import("@/content/resume/resume.json");
    const parsed = resumeSchema.safeParse(resumeModule.default);

    if (!parsed.success) {
      const errorMessage = parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Invalid resume data (resume.json): ${errorMessage}`);
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof Error && /Cannot find module/.test(error.message)) {
      return null;
    }
    throw error;
  }
}

