/**
 * Property schema. Zod so listings are validated at build time: a bad listing
 * fails `npm run build` rather than shipping broken. Field names follow common
 * UK agency feed conventions (Rightmove RTDF, Reapit, Alto, Street map cleanly),
 * so a CRM or portal feed can populate this later without a redesign.
 *
 * The core rule the whole model exists to enforce: a sales listing must carry
 * material information at the point of marketing, required under the Digital
 * Markets, Competition and Consumers Act. A discriminated union on
 * transactionType makes materialInformation mandatory for sales, so it cannot be
 * forgotten.
 */
import { z } from 'zod'

export const EpcSchema = z.object({
  rating: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
  score: z.number().int().min(1).max(100),
  certificateUrl: z.string().url().optional(),
})

export const PropertyImageSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Base64 blur placeholder generated at build time, prompt 12. */
  blurDataURL: z.string().optional(),
})

export const AssetSchema = z.object({
  src: z.string(),
  label: z.string().min(1),
})

const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  town: z.string(),
  postcode: z.string(),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

const PriceSchema = z.object({
  amount: z.number().nonnegative(),
  qualifier: z.enum(['guide', 'offers_over', 'oiro', 'fixed', 'poa']),
  frequency: z.enum(['pcm', 'pw', 'per_night']).optional(),
})

const StatusSchema = z.enum([
  'available',
  'under_offer',
  'sold_stc',
  'let_agreed',
  'let',
  'sold',
  'withdrawn',
])

/** Material information, required for sales under the DMCC Act. */
export const MaterialInformationSchema = z.object({
  tenure: z.enum(['freehold', 'leasehold', 'share_of_freehold']),
  leaseYearsRemaining: z.number().int().positive().optional(),
  groundRent: z.number().nonnegative().optional(),
  serviceCharge: z.number().nonnegative().optional(),
  councilTaxBand: z.string().min(1),
  epc: EpcSchema,
  parking: z.array(z.string()),
  heating: z.string().min(1),
  construction: z.string().min(1),
  broadband: z.object({
    type: z.string().min(1),
    maxDownloadMbps: z.number().positive().optional(),
  }),
  mobileCoverage: z.string().optional(),
  floodRisk: z.string().min(1),
  rightsOfWay: z.string().optional(),
  restrictions: z.string().optional(),
  accessibility: z.array(z.string()).optional(),
  knownIssues: z.array(z.string()).optional(),
})

/** Fields shared by every listing regardless of transaction type. */
const BaseListing = {
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  status: StatusSchema,
  displayAddress: z.string().min(1),
  fullAddress: AddressSchema,
  postcodeOutcode: z.string().min(2),
  town: z.string().min(1),
  price: PriceSchema,
  // Optional where a listing or historical record does not state them, rather
  // than invent a figure. Feeds vary too. Required inside materialInformation
  // for sales.
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  receptions: z.number().int().nonnegative().optional(),
  propertyType: z.string().min(1),
  summary: z.string().min(1),
  description: z.array(z.string().min(1)).min(1),
  /** Original old-site copy, kept as proof of work where useful. */
  archivedDescription: z.string().optional(),
  features: z.array(z.string()),
  images: z.array(PropertyImageSchema),
  floorplans: z.array(AssetSchema).optional(),
  epc: EpcSchema.optional(),
  featured: z.boolean(),
  publishedAt: z.string(),
  updatedAt: z.string(),
}

const SaleListing = z.object({
  ...BaseListing,
  transactionType: z.literal('sale'),
  tenure: z.enum(['freehold', 'leasehold', 'share_of_freehold']),
  councilTaxBand: z.string().min(1),
  // Required for sales, this is the whole point of the discriminated union.
  materialInformation: MaterialInformationSchema,
})

const LettingListing = z.object({
  ...BaseListing,
  transactionType: z.literal('letting'),
  availableFrom: z.string().optional(),
  deposit: z.number().nonnegative().optional(),
  furnished: z.enum(['furnished', 'unfurnished', 'part_furnished']).optional(),
  petsConsidered: z.boolean().optional(),
})

export const PropertySchema = z.discriminatedUnion('transactionType', [
  SaleListing,
  LettingListing,
])

export type Property = z.infer<typeof PropertySchema>
export type SaleProperty = z.infer<typeof SaleListing>
export type LettingProperty = z.infer<typeof LettingListing>
export type PropertyStatus = z.infer<typeof StatusSchema>
export type MaterialInformation = z.infer<typeof MaterialInformationSchema>
export type PropertyImage = z.infer<typeof PropertyImageSchema>
export type Epc = z.infer<typeof EpcSchema>
export type Asset = z.infer<typeof AssetSchema>
