import type { Metadata } from 'next'
import {
  Lockup,
  MarkThreshold,
  MarkPile,
  MarkDaymark,
  type ConceptId,
} from '@/components/brand/LogoConcepts'

export const metadata: Metadata = {
  title: 'Brand concepts',
  robots: { index: false, follow: false },
}

const CONCEPTS: { id: ConceptId; name: string; idea: string }[] = [
  {
    id: 'threshold',
    name: 'A. Threshold',
    idea: 'An arched doorway standing on the tide line, water lines falling away beneath it. The most literal reading of a foot on the ground: a home at the edge of the sea.',
  },
  {
    id: 'pile',
    name: 'B. Pile and plain',
    idea: 'A P and a T locked into one shape. The stem is a pile driven into the ground line, the bowl is an arch. The most ownable and compact, so it holds up best as a favicon.',
  },
  {
    id: 'daymark',
    name: 'C. Daymark',
    idea: 'The diamond topmark of a Solent navigation post, set over a house block and three falling water lines. Roof, marker and tide in one. The most distinctive on this coast.',
  },
]

const SWATCHES: [string, string][] = [
  ['harbour', 'var(--tl-harbour)'],
  ['harbour 2', 'var(--tl-harbour-2)'],
  ['slate water', 'var(--tl-slate-water)'],
  ['shingle', 'var(--tl-shingle)'],
  ['chalk', 'var(--tl-chalk)'],
  ['samphire', 'var(--tl-samphire)'],
  ['daymark', 'var(--tl-daymark)'],
]

function Small({ id }: { id: ConceptId }) {
  if (id === 'threshold')
    return (
      <>
        <MarkThreshold className="h-24 w-24" />
        <MarkThreshold accent={false} className="h-8 w-8" />
      </>
    )
  if (id === 'pile')
    return (
      <>
        <MarkPile className="h-24 w-24" />
        <MarkPile accent={false} className="h-8 w-8" />
      </>
    )
  return (
    <>
      <MarkDaymark className="h-24 w-24" />
      <MarkDaymark accent={false} className="h-8 w-8" />
    </>
  )
}

export default function BrandPage() {
  return (
    <main
      style={{ background: 'var(--tl-chalk)', color: 'var(--tl-harbour)' }}
      className="min-h-screen px-8 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.32em]">Tideline, logo concepts for approval</p>
        <h1 className="font-display mt-4 text-5xl tracking-tight">
          Three marks, one idea: a foot on the ground.
        </h1>
        <p className="mt-6 max-w-2xl text-lg">
          On the Solent the ground is defined by the tide line. Each mark is a shape standing on that
          line, with a single signal red borrowed from a navigation mark. Pick one and the rest of
          the identity is built around it.
        </p>

        <div className="mt-16 grid gap-14">
          {CONCEPTS.map((c) => (
            <section key={c.id} className="grid gap-px md:grid-cols-3" aria-labelledby={`c-${c.id}`}>
              <div className="pb-4 md:col-span-3">
                <h2 id={`c-${c.id}`} className="font-display text-3xl">
                  {c.name}
                </h2>
                <p className="mt-2 max-w-3xl">{c.idea}</p>
              </div>
              <div
                className="tl-hair flex items-center justify-center p-12"
                style={{ background: 'var(--tl-chalk)' }}
              >
                <Lockup concept={c.id} />
              </div>
              <div
                className="flex items-center justify-center p-12"
                style={{ background: 'var(--tl-harbour)', color: 'var(--tl-chalk)' }}
              >
                <Lockup concept={c.id} />
              </div>
              <div
                className="flex items-center justify-center gap-6 p-12"
                style={{ background: 'var(--tl-shingle)' }}
              >
                <Small id={c.id} />
              </div>
            </section>
          ))}
        </div>

        <h2 className="font-display mt-20 text-3xl">Palette</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-7">
          {SWATCHES.map(([name, value]) => (
            <li key={name}>
              <div className="tl-hair h-20" style={{ background: value }} />
              <p className="mt-2 text-sm">{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
