/**
 * Typed mirror of the design tokens defined in app/globals.css.
 *
 * This is the one sanctioned home for raw palette values in TypeScript, for the
 * rare case where JavaScript needs a colour string (canvas, chart, meta theme
 * colour, structured data). Prefer the CSS custom properties and Tailwind
 * utilities everywhere in components. Keep this file in step with globals.css.
 */

export const palette = {
  bone: '#F5F2EA',
  oat: '#ECE8DC',
  clayMist: '#E2DDCF',
  shell: '#E8EAFF',
  ink: '#0D0D0F',
  indigo: '#15151C',
  slate: '#5C5B57',
  terracotta: '#1B2CFF',
  sienna: '#1220C0',
  ochre: '#AAB2FF',
  marigold: '#1B2CFF',
  madder: '#2A2A33',
  verdigris: '#1B2CFF',
  verdigrisDeep: '#1220C0',
  sage: '#B9B5A8',
  brass: '#5C5B57',
} as const

export const paletteDark = {
  ground: '#0D0D0F',
  panel: '#16161A',
  ink: '#F5F2EA',
  inkSoft: '#B8B6B0',
  terracotta: '#6B78FF',
  verdigris: '#8B95FF',
  ochre: '#AAB2FF',
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
  inkOnBone: 17.36,
  slateOnBone: 6.08,
  siennaOnBone: 9.42,
  boneOnVerdigrisDeep: 9.42,
  inkOnOchre: 9.73,
  boneOnMadder: 12.71,
  boneOnInk: 17.36,
} as const

export type PaletteKey = keyof typeof palette
