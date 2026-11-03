import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { themeColor } from '@/lib/tokens'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.tradingName}, Solent coast lettings, management and sales`,
    short_name: SITE.tradingName,
    description:
      'Independent lettings, management and sales on the Solent coast. Winner of the 2018 to 2019 British Property Lettings Award.',
    start_url: '/',
    display: 'standalone',
    background_color: themeColor.light,
    theme_color: themeColor.light,
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
