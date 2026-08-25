/**
 * Typed mirror of the design tokens defined in app/globals.css.
 *
 * This is the one sanctioned home for raw palette values in TypeScript, for the
 * rare case where JavaScript needs a colour string (canvas, chart, meta theme
 * colour, structured data). Prefer the CSS custom properties and Tailwind
 * utilities everywhere in components. Keep this file in step with globals.css.
 */

export const palette = {
  bone: '#F7F2E8',
  oat: '#EDE3D2',
  clayMist: '#E2D3C3',
  shell: '#F0E0D0',
  ink: '#17232E',
  indigo: '#21384F',
  slate: '#4A5C6A',
  terracotta: '#C05C34',
  sienna: '#9C3F22',
  ochre: '#D9A02B',
  marigold: '#E8B93F',
  madder: '#7A2E4A',
  verdigris: '#2E7C6E',
  verdigrisDeep: '#1F5F55',
  sage: '#8FA891',
  brass: '#B08D57',
} as const

export const paletteDark = {
  ground: '#12181F',
  panel: '#1A2029',
  ink: '#F0E6D8',
  inkSoft: '#B9C2C9',
  terracotta: '#D9764C',
  verdigris: '#48A392',
  ochre: '#D9A02B',
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
  inkOnBone: 14.3,
  slateOnBone: 6.21,
  siennaOnBone: 5.98,
  boneOnVerdigrisDeep: 6.66,
  inkOnOchre: 6.85,
  boneOnMadder: 8.1,
  boneOnInk: 14.3,
} as const

export type PaletteKey = keyof typeof palette
