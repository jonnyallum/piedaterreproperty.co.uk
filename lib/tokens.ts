/**
 * Typed mirror of the design tokens defined in app/globals.css.
 *
 * This is the one sanctioned home for raw palette values in TypeScript, for the
 * rare case where JavaScript needs a colour string (canvas, chart, meta theme
 * colour, structured data). Prefer the CSS custom properties and Tailwind
 * utilities everywhere in components. Keep this file in step with globals.css.
 */

export const palette = {
  bone: '#F1EEE6',
  oat: '#E6E1D4',
  clayMist: '#D9D3C5',
  shell: '#E9E4D8',
  ink: '#0B1F26',
  indigo: '#16323B',
  slate: '#46636D',
  terracotta: '#BF3219',
  sienna: '#A32B15',
  ochre: '#C8B98E',
  marigold: '#E4472B',
  madder: '#2A4A54',
  verdigris: '#3F6B4F',
  verdigrisDeep: '#2F5239',
  sage: '#9DB3A3',
  brass: '#51655D',
} as const

export const paletteDark = {
  ground: '#0B1F26',
  panel: '#10282F',
  ink: '#F1EEE6',
  inkSoft: '#B3C4C9',
  terracotta: '#FF6A4D',
  verdigris: '#6FB08A',
  ochre: '#C8B98E',
} as const

/** Theme colour for the browser chrome, light and dark. */
export const themeColor = {
  light: palette.bone,
  dark: paletteDark.ground,
} as const

export const duration = {
  micro: 160,
  ui: 320,
  reveal: 720,
  scene: 1200,
} as const

export const easing = {
  quill: 'cubic-bezier(0.16, 1, 0.30, 1)',
  tide: 'cubic-bezier(0.65, 0, 0.35, 1)',
  drift: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const

/**
 * Contrast ratios measured against the light ground, for the style guide and
 * for documentation. Computed with the WCAG 2.1 relative luminance formula.
 */
export const contrast = {
  inkOnBone: 14.63,
  slateOnBone: 5.55,
  siennaOnBone: 6.22,
  boneOnVerdigrisDeep: 7.59,
  inkOnOchre: 8.71,
  boneOnMadder: 8.21,
  boneOnInk: 14.63,
} as const

export type PaletteKey = keyof typeof palette
