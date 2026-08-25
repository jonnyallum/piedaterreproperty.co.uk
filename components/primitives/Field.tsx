/**
 * Field. A labelled form control (text input, select or textarea) with hint,
 * error and required states, wired for keyboard and screen reader correctness:
 * the label is associated by id, hint and error are linked with
 * aria-describedby, and invalid controls carry aria-invalid.
 *
 * Server component; usable inside client forms because it only forwards props.
 */
import type { ReactNode, SelectHTMLAttributes } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface FieldShell {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
}

function Shell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldShell & { children: ReactNode }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="text-sales-ink" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="text-ink-soft"> (optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type InputProps = FieldShell &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>

export function Field({ id, label, hint, error, required, className, ...rest }: InputProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ')
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <input
        id={id}
        className="field-control tabular"
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        {...rest}
      />
    </Shell>
  )
}

type TextareaProps = FieldShell &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>

export function TextareaField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: TextareaProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ')
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <textarea
        id={id}
        className="field-control"
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        {...rest}
      />
    </Shell>
  )
}

type SelectProps = FieldShell &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> & {
    children: ReactNode
  }

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
  ...rest
}: SelectProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ')
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <select
        id={id}
        className="field-control"
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        {...rest}
      >
        {children}
      </select>
    </Shell>
  )
}
