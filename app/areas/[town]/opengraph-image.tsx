import { ImageResponse } from 'next/og'
import { palette } from '@/lib/tokens'
import { SITE } from '@/lib/site'
import { getAreaContent, areaSlugs } from '@/content/areas/pages'

/**
 * Area Open Graph image (prompt 11 C): the town name on the branded card, so a
 * shared town-page link reads as a local card. Pre-generated for each town.
 */
export const alt = 'Estate and letting agents on the Solent coast'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return areaSlugs().map((town) => ({ town }))
}

export default async function AreaOgImage({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params
  const area = getAreaContent(town)
  const name = area ? area.name : 'The Solent coast'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: palette.indigo,
          color: palette.bone,
          padding: 72,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: palette.brass }} />
          <div style={{ fontSize: 28, color: palette.brass }}>{SITE.tradingName}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ height: 3, width: 120, background: palette.ochre }} />
          <div style={{ fontSize: 40, color: palette.brass }}>Estate and letting agents in</div>
          <div style={{ fontSize: 96, lineHeight: 1, color: palette.bone }}>{name}</div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: palette.ochre }}>
          piedaterreproperty.co.uk
        </div>
      </div>
    ),
    size
  )
}
