'use client'

/**
 * PropertyGallery. An arch-masked main image with a thumbnail strip, and a
 * full-screen lightbox that is fully keyboard operable: arrow keys move between
 * images, Escape closes, and Tab is trapped inside the dialog so focus can never
 * fall behind the overlay. Focus returns to the thumbnail that opened it.
 *
 * With no photography yet, it renders the branded placeholder and no lightbox,
 * so a listing without images is honest rather than broken.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PropertyPlaceholder } from './PropertyPlaceholder'
import { Icon } from '@/components/primitives/Icon'
import type { PropertyImage } from '@/lib/schemas/property'
import { cn } from '@/lib/cn'

interface PropertyGalleryProps {
  images: PropertyImage[]
  /** Used only if an image is missing its own alt, never as a substitute. */
  addressLabel: string
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const count = images.length
  const go = useCallback((next: number) => setActive((next + count) % count), [count])

  const openAt = (i: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setActive(i)
    setOpen(true)
  }
  const close = useCallback(() => setOpen(false), [])

  // Lock body scroll while the lightbox is open, and move focus into it.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      returnFocusRef.current?.focus()
    }
  }, [open])

  // Keyboard: Escape closes, arrows navigate, Tab is trapped in the dialog.
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(active + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(active - 1)
      } else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        const activeEl = document.activeElement
        if (e.shiftKey && activeEl === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, active, go, close])

  if (count === 0) {
    return (
      <div className="property-media arch-shallow aspect-[3/2]">
        <PropertyPlaceholder />
      </div>
    )
  }

  const cover = images[active]
  if (!cover) return null

  return (
    <div>
      <button
        type="button"
        onClick={() => openAt(active)}
        className="property-media arch-shallow group relative block aspect-[3/2] w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        aria-label={`View ${cover.alt} full screen. Image ${active + 1} of ${count}.`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 64rem) 100vw, 60vw"
          priority
          className="h-full w-full object-cover"
          placeholder={cover.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={cover.blurDataURL}
        />
        <span
          className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xs bg-ink/80 px-2.5 py-1.5 text-small text-on-dark"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <Icon name="expand" className="h-4 w-4" />
          <span className="tabular">
            {active + 1} / {count}
          </span>
        </span>
      </button>

      {count > 1 ? (
        <ul className="mt-3 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onDoubleClick={() => openAt(i)}
                aria-label={`Show ${img.alt}`}
                aria-current={i === active ? 'true' : undefined}
                className={cn(
                  'property-media arch-shallow block aspect-[4/3] w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass',
                  i === active ? 'ring-2 ring-brass' : 'opacity-80 hover:opacity-100'
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 64rem) 20vw, 7.5rem"
                  className="h-full w-full object-cover"
                  placeholder={img.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={img.blurDataURL}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Property photographs, image ${active + 1} of ${count}`}
          className="fixed inset-0"
          style={{ zIndex: 'var(--z-modal)' }}
        >
          {/* Backdrop as a real, labelled button so click-to-close carries no
              a11y violation. The overlay above passes pointer events through to
              it except on the controls, so empty space closes the viewer. */}
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={close}
            tabIndex={-1}
            className="absolute inset-0 cursor-zoom-out bg-ink/95"
          />

          <div className="pointer-events-none absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 text-on-dark">
              <span className="eyebrow tabular text-on-dark/80">
                {active + 1} / {count}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-sm px-3 py-2 text-small text-on-dark hover:bg-on-dark/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
              >
                Close
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
              {count > 1 ? (
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous image"
                  className="pointer-events-auto absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-on-dark/10 text-on-dark hover:bg-on-dark/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <Icon name="arrow-right" className="h-6 w-6 rotate-180" />
                </button>
              ) : null}

              <div className="pointer-events-auto relative flex max-h-full max-w-5xl items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- lightbox needs object-contain across mixed aspect ratios; next/image fill would crop */}
                <img
                  src={cover.src}
                  alt={cover.alt}
                  className="max-h-[78vh] w-auto max-w-full rounded-sm object-contain"
                />
              </div>

              {count > 1 ? (
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next image"
                  className="pointer-events-auto absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-on-dark/10 text-on-dark hover:bg-on-dark/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <Icon name="arrow-right" className="h-6 w-6" />
                </button>
              ) : null}
            </div>

            <p className="px-6 pb-6 text-center text-small text-on-dark/80">{cover.alt}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
