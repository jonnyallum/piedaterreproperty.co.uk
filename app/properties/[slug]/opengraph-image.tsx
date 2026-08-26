import { ImageResponse } from 'next/og'
import { palette } from '@/lib/tokens'
import { SITE } from '@/lib/site'
import { getBySlug, allSlugs } from '@/lib/properties'
import { formatPrice } from '@/lib/format'
import { STATUS_LABEL } from '@/components/property/status'

/**
 * Property Open Graph image (prompt 11 C): the price and address composited onto
 * the branded card, so a shared listing link reads as a real particulars card in
 * a feed. Pre-generated for every property at build.
 */
export const alt = 'Property from Pied-à-Terre Property'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }))
}

export default async function PropertyOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = getBySlug(slug)

  const heading = property ? property.displayAddress : 'Property'
  const price = property ? formatPrice(property.price) : ''
  const status = property ? STATUS_LABEL[property.status] : ''
  // Precompose the line so its div has a single text child, which Satori requires.
  const townLine = property ? `${property.town}, Hampshire` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: palette.ink,
          color: palette.bone,
          padding: 72,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: palette.brass }} />
            <div style={{ fontSize: 28, color: palette.brass }}>{SITE.tradingName}</div>
          </div>
          {status ? (
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: palette.ink,
                background: palette.ochre,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 4,
              }}
            >
              {status}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ height: 3, width: 120, background: palette.brass }} />
          <div style={{ fontSize: 58, lineHeight: 1.05, maxWidth: 1000 }}>{heading}</div>
          {townLine ? (
            <div style={{ display: 'flex', fontSize: 30, color: palette.brass }}>{townLine}</div>
          ) : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 40, color: palette.ochre }}>{price}</div>
          <div style={{ display: 'flex', fontSize: 24, color: palette.bone }}>
            piedaterreproperty.co.uk
          </div>
        </div>
      </div>
    ),
    size
  )
}
