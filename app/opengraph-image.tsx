import { ImageResponse } from 'next/og'
import { palette } from '@/lib/tokens'
import { SITE } from '@/lib/site'

/**
 * General Open Graph image (prompt 11 C), generated at build with next/og. A calm
 * branded card on the bone ground with a brass rule, used as the default social
 * card site-wide. Uses the token palette so no raw values live outside the token
 * layer.
 */
export const alt = 'Pied-à-Terre Property, Solent coast lettings, management and sales'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: palette.bone,
          color: palette.ink,
          padding: 72,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: palette.brass }} />
          <div style={{ fontSize: 30, letterSpacing: 1, color: palette.slate }}>
            {SITE.tradingName}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ height: 3, width: 120, background: palette.brass }} />
          <div style={{ fontSize: 62, lineHeight: 1.05, maxWidth: 900 }}>
            Estate and letting agents on the Solent coast
          </div>
          <div style={{ fontSize: 30, color: palette.slate, maxWidth: 860 }}>
            Portsmouth, Havant, Waterlooville, Emsworth and Hayling Island. Independent since 2011.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: palette.terracotta }}>
          piedaterreproperty.co.uk
        </div>
      </div>
    ),
    size
  )
}
