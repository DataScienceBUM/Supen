import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Observatorio SUPEN'),
    category: z.enum(['operadoras', 'indices', 'leyes', 'guias']),
    categoryLabel: z.string(),
    tags: z.array(z.string()).default([]),
    readTimeMinutes: z.number().default(5),
    featured: z.boolean().default(false),
    relatedSimulator: z.string().optional(),
    relatedSimulatorLabel: z.string().optional(),
  }),
});

export const collections = { blog };
