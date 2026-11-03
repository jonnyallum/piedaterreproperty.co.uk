/**
 * Typed mirror of the design tokens defined in app/globals.css.
 *
 * This is the one sanctioned home for raw palette values in TypeScript, for the
 * rare case where JavaScript needs a colour string (canvas, chart, meta theme
 * colour, structured data). Prefer the CSS custom properties and Tailwind
 * utilities everywhere in components. Keep this file in step with globals.css.
 */

export const palette = {
  bone: '#efe9d8',
  oat: '#e4dcc4',
  clayMist: '#d8cda9',
  shell: '#fbe9a0',
  ink: '#0c0c0a',
  indigo: '#dfb000',
  slate: '#55524a',
  terracotta: '#1a1a17',
  sienna: '#2b2b26',
  ochre: '#0c0c0a',
  yellow: '#f2c200',
  black: '#0c0c0a',
  marigold: '#1a1a17',
  madder: '#26261f',
  verdigris: '#1a1a17',
  verdigrisDeep: '#2b2b26',
  sage: '#b5ad98',
  brass: '#6f5600',
} as const

export const paletteDark = {
  ground: '#0c0c0a',
  panel: '#1a1a17',
  ink: '#efe9d8',
  inkSoft: '#bdb8a8',
  terracotta: '#f2c200',
  verdigris: '#f7d54a',
  ochre: '#f2c200',
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
  inkOnYellow: 11.7,
  yellowOnBlack: 11.7,
  boneOnMadder: 12.71,
  boneOnInk: 17.36,
} as const

export type PaletteKey = keyof typeof palette
