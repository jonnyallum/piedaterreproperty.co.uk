import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { COOKIES, CATEGORY_LABEL, CATEGORY_NOTE } from '@/lib/consent'
import { LEGAL_REVIEWED } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Cookie policy',
  description:
    'The cookies and similar technology piedaterreproperty.co.uk can set, what each one does, how long it lasts, and how to control them.',
  path: '/cookie-policy',
})

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Cookie policy"
        trail={[{ name: 'Cookie policy', path: '/cookie-policy' }]}
        title={
          <>
            What we set, <em className="italic">and why</em>.
          </>
        }
        lead="This table is generated from the same configuration as the consent banner, so the two can never drift apart. Nothing non-essential is set until you choose."
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard users must be able to scroll this table */}
        <div tabIndex={0} role="region" aria-label="Table, scrolls sideways on small screens" className="overflow-x-auto rounded-none border-[length:var(--pane-gap)] border-ink bg-well">
          <table className="w-full border-collapse text-small">
            <caption className="sr-only">
              Cookies and similar technology used on this site, with provider, purpose, duration and category
            </caption>
            <thead>
              <tr className="border-b-[length:var(--pane-gap)] border-ink text-left">
                <th scope="col" className="px-4 py-3 font-medium text-ink">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-ink">
                  Provider
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-ink">
                  Purpose
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-ink">
                  Duration
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-ink">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr key={cookie.name} className="border-b-[length:var(--pane-gap)] border-ink align-top">
                  <td className="px-4 py-3 font-mono text-ink">{cookie.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{cookie.provider}</td>
                  <td className="px-4 py-3 text-ink-soft">{cookie.purpose}</td>
                  <td className="px-4 py-3 text-ink-soft">{cookie.duration}</td>
                  <td className="px-4 py-3 text-ink-soft">{CATEGORY_LABEL[cookie.category]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {(Object.keys(CATEGORY_LABEL) as (keyof typeof CATEGORY_LABEL)[]).map((category) => (
            <div key={category} className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-5">
              <h2 className="text-h3">{CATEGORY_LABEL[category]}</h2>
              <p className="measure mt-2 text-small text-ink-soft">{CATEGORY_NOTE[category]}</p>
            </div>
          ))}
        </div>

        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
