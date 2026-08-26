/**
 * SiteImage. The delivery half of the prompt 12 image pipeline. It renders a
 * pre-generated, SSIM-tuned AVIF and WebP ladder straight from the manifest, so
 * the bytes on the wire are exactly what the pipeline tuned and never a runtime
 * re-encode.
 *
 * Why a <picture> and a justified bare <img> rather than next/image: the assets
 * are already optimal, so next/image's optimiser would re-encode them, and its
 * custom-loader output is a single-format <img> that cannot do the AVIF then
 * WebP <source> negotiation this pipeline produces. The <img> still carries
 * explicit width and height (from the manifest, so no layout shift), a real blur
 * placeholder, correct sizes, and lazy or eager loading.
 *
 * Until photography is processed the manifest is empty, so getImage returns
 * undefined and SiteImage renders nothing. Callers pass a fallback (a gradient
 * scene, a placeholder) for that state, which is how the site behaves today.
 */
import { preload } from 'react-dom'
import { getImage, srcSet, fallbackSrc } from '@/lib/images'
import { cn } from '@/lib/cn'

interface SiteImageProps {
  /** Manifest key, the source filename without its extension. */
  imageKey: string
  /** The sizes attribute, sized to the real layout so a phone never pulls a desktop rung. */
  sizes: string
  className?: string
  /**
   * Set on the single largest-contentful image of a page, never more than one.
   * Loads eagerly, hints high priority, and preloads the AVIF ladder in the head.
   */
  priority?: boolean
  /** Override the manifest alt only when the semantics differ, for example '' for a decorative use. */
  alt?: string
}

export function SiteImage({ imageKey, sizes, className, priority = false, alt }: SiteImageProps) {
  const image = getImage(imageKey)
  if (!image) return null

  const avifSet = srcSet(image, 'avif')

  // Preload the LCP image's AVIF ladder so the browser fetches it in parallel
  // with the document, the same head hint next/image emits for a priority image.
  if (priority) {
    preload(fallbackSrc(image, 'avif'), {
      as: 'image',
      fetchPriority: 'high',
      imageSrcSet: avifSet,
      imageSizes: sizes,
    })
  }

  const resolvedAlt = alt ?? image.alt

  return (
    <picture>
      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      {/* An <img> inside <picture> is the sanctioned responsive pattern, so the
          no-img-element rule does not flag it. It carries explicit dimensions,
          the srcset, sizes and the blur, per the file header. */}
      <img
        src={fallbackSrc(image, 'webp')}
        alt={resolvedAlt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('block', className)}
        // The blur placeholder sits behind the image and is covered the instant
        // the real bytes decode, so the loading state looks intentional.
        style={{
          backgroundImage: `url(${image.blurDataURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </picture>
  )
}
