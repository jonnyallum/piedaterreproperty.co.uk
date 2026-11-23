import { z } from 'zod'

/**
 * Domain contract for Pied-à-Terre Vision.
 * Images are stored by private object keys, not public URLs.
 * A vendor-hosted tour is a publication artifact, not the original asset.
 */

export const VisionVariantSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(80),
  kind: z.enum(['original', 'concept']),
  designNotes: z.string().max(1000).optional(),
  approvedAt: z.string().datetime().nullable().default(null),
  publisher: z.enum(['kuula', 'matterport', '3dvista', 'self_hosted']),
  tourUrl: z.string().url().optional(),
})

export const VisionCapturePointSchema = z.object({
  id: z.string().min(1),
  room: z.string().min(1).max(100),
  level: z.string().max(40).optional(),
  sequence: z.number().int().nonnegative(),
  originalObjectKey: z.string().min(1),
  conceptObjectKeys: z.record(z.string(), z.string().min(1)).default({}),
  capturedAt: z.string().datetime(),
})

export const VisionProjectSchema = z.object({
  id: z.string().min(1),
  propertyId: z.string().min(1),
  name: z.string().min(1).max(160),
  status: z.enum(['draft', 'captured', 'staging', 'review', 'approved', 'published', 'archived']),
  captureConsentEvidenceKey: z.string().min(1),
  privacyApprovedAt: z.string().datetime().nullable().default(null),
  publicationApprovedAt: z.string().datetime().nullable().default(null),
  variants: z.array(VisionVariantSchema).min(1),
  capturePoints: z.array(VisionCapturePointSchema).default([]),
}).superRefine((project, ctx) => {
  if (project.variants.filter((item) => item.kind === 'original').length !== 1) {
    ctx.addIssue({ code: 'custom', path: ['variants'], message: 'Exactly one original variant is required.' })
  }
  if (project.status === 'published' && !project.publicationApprovedAt) {
    ctx.addIssue({ code: 'custom', path: ['publicationApprovedAt'], message: 'Publication approval required.' })
  }
})

export type VisionProject = z.infer<typeof VisionProjectSchema>
export type VisionVariant = z.infer<typeof VisionVariantSchema>
export type VisionCapturePoint = z.infer<typeof VisionCapturePointSchema>

/** Only our chosen demonstration tour provider may be embedded in week one. */
export function safeKuulaUrl(candidate: string | undefined): string | null {
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    const allowed = url.hostname === 'kuula.co' || url.hostname.endsWith('.kuula.co')
    if (url.protocol !== 'https:' || !allowed || url.username || url.password) return null
    return url.toString()
  } catch {
    return null
  }
}
