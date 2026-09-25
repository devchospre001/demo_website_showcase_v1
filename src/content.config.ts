import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// A missing or wrong field fails the build. See docs/architecture.md section 4.

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(40),
      summary: z.string().max(120),
      shortSummary: z.string().max(60), // mobile card copy (concept design)
      formLabel: z.string(), // option label in the quote form
      heroImage: image(),
      heroAlt: z.string().min(10),
      order: z.number().int(),
      price: z.string(), // e.g. "$12k–$45k"
      seoTitle: z.string().max(70),
      seoDescription: z.string().max(160),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(40),
      shortTitle: z.string().max(24).optional(), // mobile gallery label
      caption: z.string(), // gallery caption, e.g. "Nocatee · 420 sq ft · 8 days"
      captionShort: z.string().optional(), // mobile gallery caption
      service: reference("services"),
      city: z.string(),
      summary: z.string().max(200),
      size: z.string().optional(),
      scope: z.string().optional(),
      scopeShort: z.string().optional(), // one-line version for phones
      duration: z.string(),
      completed: z.coerce.date(),
      featured: z.boolean().default(false),
      order: z.number().int(),
      images: z.array(z.object({ src: image(), alt: z.string().min(10) })).min(1),
      before: z.object({ src: image(), alt: z.string().min(10) }).optional(),
    }),
});

const reviews = defineCollection({
  loader: file("src/content/reviews.yaml"),
  schema: z.object({
    author: z.string(),
    city: z.string(),
    rating: z.number().int().min(1).max(5),
    text: z.string(),
    service: reference("services"),
    date: z.coerce.date(),
    source: z.literal("Sample review"), // demo mode: never presented as real
  }),
});

const faq = defineCollection({
  loader: file("src/content/faq.yaml"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    shortAnswer: z.string().optional(), // mobile copy (concept design)
    service: reference("services").optional(),
    home: z.boolean().default(false),
    order: z.number().int(),
  }),
});

export const collections = { services, projects, reviews, faq };
