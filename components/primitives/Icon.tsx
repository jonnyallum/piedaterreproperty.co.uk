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
