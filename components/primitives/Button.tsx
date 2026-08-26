/**
 * Button. Five variants from the design system, each with the full state
 * matrix (default, hover, focus-visible, active, disabled, loading) driven by
 * the .btn classes in globals.css.
 *
 * Polymorphic: pass `href` for a link (renders next/link), omit it for a real
 * <button>. The loading state sets aria-busy and shows an indeterminate brass
 * sweep, never a spinner.
 *
 * Server component. Magnetic pull on the primary CTA is layered on separately
 * by a client wrapper so this stays render-cheap.
 */
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'sales' | 'lettings' | 'secondary' | 'ghost' | 'icon'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  sales: 'btn btn-sales',
  lettings: 'btn btn-lettings',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
  icon: 'btn btn-icon',
}

interface CommonProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
  loading?: boolean
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps & {
  href: string
  /** External links open safely and are marked. */
  external?: boolean
  'aria-label'?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const { variant = 'sales', children, className } = props
  const classes = cn(VARIANT_CLASS[variant], className)

  if ('href' in props && props.href !== undefined) {
    const { href, external, ...rest } = props as ButtonAsLink
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={rest['aria-label']}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={rest['aria-label']}>
        {children}
      </Link>
    )
  }

  const {
    disabled,
    type = 'button',
    variant: nativeVariant = 'sales',
    className: nativeClassName,
    loading: nativeLoading = false,
    children: nativeChildren,
    ...rest
  } = props as ButtonAsButton
  return (
    <button
      type={type}
      className={cn(VARIANT_CLASS[nativeVariant], nativeClassName)}
      disabled={disabled || nativeLoading}
      aria-busy={nativeLoading || undefined}
      {...rest}
    >
      {nativeChildren}
    </button>
  )
}
