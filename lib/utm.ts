/**
 * UTM capture and retrieval (prompt 14 D). Campaign URLs carry utm_* query
 * parameters; this captures them on landing into sessionStorage so they survive
 * the visit and can be attached to any lead submitted in the session, which is
 * what lets the office email say which campaign a lead came from.
 *
 * Last touch within the session: a later campaign link overwrites an earlier
 * one, and the set clears when the browser session ends, which is the right
 * lifetime for campaign attribution. Everything is best-effort and null-safe so
 * a private window that blocks storage never breaks a form.
 */
export interface StoredUtm {
  source?: string
  medium?: string
  campaign?: string
  content?: string
}

const KEY = 'pt_utm'
const FIELDS: (keyof StoredUtm)[] = ['source', 'medium', 'campaign', 'content']

/** Read utm_* from the current URL and store them if any are present. */
export function captureUtm(): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const found: StoredUtm = {}
    let any = false
    for (const field of FIELDS) {
      const value = params.get(`utm_${field}`)
      if (value) {
        found[field] = value.slice(0, 120)
        any = true
      }
    }
    if (any) window.sessionStorage.setItem(KEY, JSON.stringify(found))
  } catch {
    // sessionStorage throws in some private modes; attribution is best-effort.
  }
}

/** The UTM set stored for this session, if any, for attaching to a lead. */
export function readUtm(): StoredUtm | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StoredUtm) : undefined
  } catch {
    return undefined
  }
}
