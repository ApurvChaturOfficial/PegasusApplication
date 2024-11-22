import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const baseSchema = z.object({
  _id: z.string(),
  aTitle: z.string(),
  aSubtitle: z.string(),
  aDescription: z.string(),
  aDetail: z.string(),
  aStatus: z.string(),
  aSlug: z.string(),
})

export type BaseType = z.infer<typeof baseSchema>
