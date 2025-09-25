import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  coverImage: z.string().min(1),
  images: z.array(z.string()).optional(),
  gallery: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        caption: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    )
    .optional(),
  demo: z.string().url().optional(),
  github: z.string().url().optional(),
  date: z.string().min(1),
});

export const toolConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  featured: z.boolean().default(false),
  component: z.string().min(1),
  slug: z.string().min(1),
});

export const personalInfoSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  email: z.string().email(),
  summary: z.string(),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    })
  ),
});

export const workExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string(),
  achievements: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()).default([]),
});

export const skillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const resumeSchema = z.object({
  personal: personalInfoSchema,
  experience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillCategorySchema),
});

export type ProjectFrontmatterInput = z.input<typeof projectFrontmatterSchema>;
export type ToolConfigInput = z.input<typeof toolConfigSchema>;
export type ResumeInput = z.input<typeof resumeSchema>;
