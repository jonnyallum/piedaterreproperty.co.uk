/**
 * Icon. A single custom line set, 24px grid, 1.25 stroke, round caps, drawn
 * with a slight hand-cut irregularity so the marks sit with Fraunces. No emoji,
 * no Font Awesome, no Material icons.
 *
 * Stroke width is a unitless SVG attribute, so it carries no px. Size is set by
 * the caller through Tailwind width and height utilities on the class.
 *
 * Property and place icons (bed, bath, EPC leaf, sail, oyster) are added in the
 * prompts that need them; this seed covers UI and social.
 */
import { cn } from '@/lib/cn'

export type IconName =
  | 'phone'
  | 'whatsapp'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'arch'
  | 'instagram'
  | 'facebook'
  | 'pin'
  | 'clock'
  | 'mail'
  | 'check'
  | 'bed'
  | 'bath'
  | 'sofa'
  | 'leaf'
  | 'car'
  | 'search'
  | 'key'
  | 'pound'
  | 'flame'
  | 'wifi'
  | 'shield'
  | 'home'
  | 'printer'
  | 'expand'

interface IconProps {
  name: IconName
  className?: string
  title?: string
}

const PATHS: Record<IconName, React.ReactNode> = {
  phone: (
    <path d="M6.5 3.5c.6 0 1.1.4 1.3 1l.9 2.7c.2.5 0 1.1-.4 1.4l-1.3 1c.9 1.9 2.5 3.5 4.4 4.4l1-1.3c.3-.4.9-.6 1.4-.4l2.7.9c.6.2 1 .7 1 1.3v2.4c0 .8-.7 1.5-1.5 1.4C10.8 19 5 13.2 4.6 6.1 4.5 5.2 5.2 4.5 6 4.5z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-3.9a7.5 7.5 0 112.9 2.8z" />
      <path d="M9 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c0 .2 0 .4-.1.5l-.5.6c-.1.2-.2.3 0 .6.4.7 1.2 1.5 2 1.8.3.1.4.1.6-.1l.5-.6c.2-.2.3-.2.6-.1l1.5.7c.3.1.3.4.3.6 0 .8-.9 1.4-1.5 1.4-1.6 0-4.3-1.7-5.4-4.4-.3-.7-.3-1.6-.1-2.5z" />
    </>
  ),
  'arrow-right': <path d="M4 12h15M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17L17 7M8 7h9v9" />,
  'chevron-down': <path d="M5 9l7 6 7-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arch: <path d="M5 20V11a7 7 0 0114 0v9M5 20h14" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17" cy="7" r="0.6" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2V5.5h-2.3c-1.9 0-3.2 1.2-3.2 3.2v1.8H9v3h2v6h3v-6h2.2l.5-3H14v-1.4c0-.5.2-.6.5-.6z" />,
  pin: (
    <>
      <path d="M12 21c4-4 6-7 6-10a6 6 0 10-12 0c0 3 2 6 6 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="M4 7l8 5.5L20 7" />
    </>
  ),
  check: <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />,
  bed: (
    <>
      <path d="M3 8v10M3 12h18v6M21 18v-4a3 3 0 0 0-3-3h-6v4" />
      <path d="M6.5 9.5h2.2c.6 0 1 .4 1 1v.5H5.5V10.5c0-.6.4-1 1-1z" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12V6.5A1.5 1.5 0 0 1 5.5 5c.9 0 1.5.7 1.5 1.6" />
      <path d="M3 12h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
      <path d="M7 18l-1 2M18 18l1 2" />
    </>
  ),
  sofa: (
    <>
      <path d="M5 11V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
      <path d="M3 12a2 2 0 0 1 2 2v2h14v-2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3H1v-3a2 2 0 0 1 2-2z" />
      <path d="M6 18v1.5M18 18v1.5" />
    </>
  ),
  leaf: <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1zM8 16c2-3 5-5 8-6" />,
  car: (
    <>
      <path d="M4 16v2M20 16v2M5 16h14l-1.5-5.2A2 2 0 0 0 15.6 9.5H8.4a2 2 0 0 0-1.9 1.3L5 16z" />
      <path d="M3 16h18" />
      <circle cx="7.5" cy="16" r="1.2" />
      <circle cx="16.5" cy="16" r="1.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="3.3" />
      <path d="M10.4 10.4L19 19M14.5 14.5l2-2M17 17l2-2" />
    </>
  ),
  pound: <path d="M15.5 7.2c-.7-1-1.9-1.6-3.1-1.4C10.7 6 9.7 7.3 9.7 9v9M7 12.5h6M7 18h9.5" />,
  flame: <path d="M12 3.5s4 3 4 7.8a4 4 0 0 1-8 0c0-1.9 1-3 2-4 .3 1 1.1 1.5 1.1 1.5S12 6.4 12 3.5z" />,
  wifi: (
    <>
      <path d="M4.8 9.4a10.5 10.5 0 0 1 14.4 0M7.6 12.5a6.5 6.5 0 0 1 8.8 0M10.3 15.6a2.6 2.6 0 0 1 3.4 0" />
      <path d="M12 18.6h.01" />
    </>
  ),
  shield: <path d="M12 3.2l7 3v5.2c0 4-3 6.9-7 8.6-4-1.7-7-4.6-7-8.6V6.2z" />,
  home: <path d="M4 11l8-6.2 8 6.2M6.2 9.8V19h11.6V9.8M10 19v-5h4v5" />,
  printer: (
    <>
      <path d="M7 9V4h10v5M7 17H5.2A2.2 2.2 0 0 1 3 14.8V11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.8a2.2 2.2 0 0 1-2.2 2.2H17" />
      <path d="M7 14h10v6H7z" />
      <path d="M17 11.5h.01" />
    </>
  ),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
}

const FILLED = new Set<IconName>(['whatsapp', 'facebook'])

export function Icon({ name, className, title }: IconProps) {
  const filled = FILLED.has(name)
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('inline-block h-6 w-6', className)}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  )
}
