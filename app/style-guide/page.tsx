import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Button } from '@/components/primitives/Button'
import { Arch } from '@/components/primitives/Arch'
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { BrassRule } from '@/components/primitives/BrassRule'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { palette, contrast } from '@/lib/tokens'

export const metadata: Metadata = {
  title: 'Style guide',
  robots: { index: false, follow: false },
}

const GROUNDS: [string, string][] = [
  ['bone', palette.bone],
  ['oat', palette.oat],
  ['clay-mist', palette.clayMist],
  ['shell', palette.shell],
]
const INK: [string, string][] = [
  ['ink', palette.ink],
  ['indigo', palette.indigo],
  ['slate', palette.slate],
]
const PIGMENTS: [string, string][] = [
  ['terracotta', palette.terracotta],
  ['sienna', palette.sienna],
  ['ochre', palette.ochre],
  ['marigold', palette.marigold],
  ['madder', palette.madder],
  ['verdigris', palette.verdigris],
  ['verdigris-d', palette.verdigrisDeep],
  ['sage', palette.sage],
  ['brass', palette.brass],
]

const TYPE_STEPS: [string, string, string][] = [
  ['Display', 'text-display', 'clamp(3.25rem, 8.5vw, 8rem)'],
  ['Heading 1', 'text-h1', 'clamp(2.5rem, 5.5vw, 4.75rem)'],
  ['Heading 2', 'text-h2', 'clamp(1.9rem, 3.4vw, 3rem)'],
  ['Heading 3', 'text-h3', 'clamp(1.35rem, 2vw, 1.75rem)'],
  ['Lead', 'text-lead', 'clamp(1.1rem, 1.5vw, 1.375rem)'],
  ['Body', 'text-body', '1.0625rem'],
  ['Small', 'text-small', '0.875rem'],
]

const GRADIENTS: [string, string][] = [
  ['Harbour Dusk', 'surface-harbour-dusk'],
  ['Kiln', 'surface-kiln'],
  ['Tide', 'surface-tide'],
  ['Salt Flat', 'surface-salt-flat'],
]

const CONTRAST_ROWS: [string, number, string][] = [
  ['ink on bone', contrast.inkOnBone, 'AAA'],
  ['bone on ink', contrast.boneOnInk, 'AAA'],
  ['slate on bone', contrast.slateOnBone, 'AA'],
  ['sienna on bone', contrast.siennaOnBone, 'AA'],
  ['bone on verdigris-d', contrast.boneOnVerdigrisDeep, 'AA'],
  ['ink on ochre', contrast.inkOnOchre, 'AA'],
  ['bone on madder', contrast.boneOnMadder, 'AAA'],
]

const ALL_ICONS: IconName[] = [
  'phone',
  'whatsapp',
  'mail',
  'pin',
  'clock',
  'arch',
  'arrow-right',
  'arrow-up-right',
  'chevron-down',
  'menu',
  'close',
  'check',
  'instagram',
  'facebook',
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t-[length:var(--pane-gap)] border-night py-14">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="overflow-hidden rounded-sm border-[length:var(--pane-gap)] border-night">
      <div className="h-20 w-full" style={{ backgroundColor: hex }} />
      <div className="bg-ground px-3 py-2">
        <p className="text-small font-medium text-ink">{name}</p>
        <p className="tabular text-small text-ink-soft">{hex}</p>
      </div>
    </div>
  )
}

/** The full component gallery, rendered once per theme scene. */
function Gallery() {
  return (
    <div className="bg-ground px-6 py-10 text-ink md:px-10">
      <h2 className="text-h2">Buttons</h2>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="sales">Primary sales</Button>
        <Button variant="lettings">Primary lettings</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost link</Button>
        <button type="button" className="btn btn-icon" aria-label="Example icon button">
          <Icon name="arrow-right" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Button variant="sales" loading>
          Loading
        </Button>
        <Button variant="sales" disabled>
          Disabled
        </Button>
        <Button variant="lettings" disabled>
          Disabled
        </Button>
      </div>

      <h2 className="mt-12 text-h2">Fields</h2>
      <div className="mt-6 grid max-w-xl gap-5">
        <Field id="sg-name" label="Full name" placeholder="Jane Harbour" required />
        <Field
          id="sg-email"
          label="Email"
          type="email"
          hint="We reply within one working day."
          placeholder="jane@example.co.uk"
        />
        <Field
          id="sg-phone"
          label="Phone"
          type="tel"
          error="Enter a UK phone number."
          defaultValue="01243"
        />
        <SelectField id="sg-town" label="Area" required>
          <option value="">Choose an area</option>
          <option>Havant</option>
          <option>Portsmouth</option>
          <option>Emsworth</option>
        </SelectField>
        <TextareaField id="sg-msg" label="Message" placeholder="How can we help?" />
      </div>

      <h2 className="mt-12 text-h2">Arch and grain</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Arch variant="full" className="relative aspect-[4/5] surface-tide">
          <Grain fixed={false} photo />
          <span className="absolute bottom-4 left-4 text-on-dark">arch, full</span>
        </Arch>
        <Arch variant="shallow" className="relative aspect-[4/5] surface-kiln">
          <Grain fixed={false} photo />
          <span className="absolute bottom-4 left-4 text-on-dark">arch, shallow</span>
        </Arch>
      </div>

      <h2 className="mt-12 text-h2">Brass rule</h2>
      <BrassRule className="mt-6 w-full" />
    </div>
  )
}

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24 pt-32 md:px-8">
      <header>
        <Eyebrow>Internal . not indexed</Eyebrow>
        <h1 className="mt-4 text-h1">
          The system, <em className="italic text-sales-ink">proven</em>.
        </h1>
        <p className="measure mt-5 text-lead text-ink-soft">
          Every token and every primitive, rendered before any marketing page consumes
          them. If it is not here, it does not exist in the system.
        </p>
      </header>

      <Section title="Grounds, warm paper">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GROUNDS.map(([n, h]) => (
            <Swatch key={n} name={n} hex={h} />
          ))}
        </div>
      </Section>

      <Section title="Ink and structure">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INK.map(([n, h]) => (
            <Swatch key={n} name={n} hex={h} />
          ))}
        </div>
      </Section>

      <Section title="Pigments">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PIGMENTS.map(([n, h]) => (
            <Swatch key={n} name={n} hex={h} />
          ))}
        </div>
      </Section>

      <Section title="Measured contrast, all AA or better">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-small">
            <thead>
              <tr className="text-ink-soft">
                <th className="py-2 pr-6 font-medium">Pairing</th>
                <th className="py-2 pr-6 font-medium">Ratio</th>
                <th className="py-2 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_ROWS.map(([pair, ratio, grade]) => (
                <tr key={pair} className="border-t-[length:var(--pane-gap)] border-night">
                  <td className="py-2 pr-6">{pair}</td>
                  <td className="tabular py-2 pr-6">{ratio.toFixed(2)} to 1</td>
                  <td className="py-2">{grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Type scale">
        <div className="flex flex-col gap-4">
          {TYPE_STEPS.map(([label, cls, size]) => (
            <div key={label} className="flex flex-wrap items-baseline gap-4">
              <span className={`${cls} font-display text-ink`}>{label}</span>
              <span className="tabular text-small text-ink-soft">{size}</span>
            </div>
          ))}
          <p className="eyebrow mt-2">Eyebrow . Martian Mono . 0.16em tracking</p>
        </div>
      </Section>

      <Section title="Gradients, each under grain">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GRADIENTS.map(([label, cls]) => (
            <div
              key={label}
              className={`relative h-32 overflow-hidden rounded-sm ${cls}`}
            >
              <Grain fixed={false} photo />
              <span className="absolute bottom-3 left-3 text-small text-on-dark">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Iconography, one custom set">
        <div className="flex flex-wrap gap-5 text-ink">
          {ALL_ICONS.map((n) => (
            <span key={n} className="flex flex-col items-center gap-2">
              <Icon name={n} className="h-7 w-7" />
              <span className="text-small text-ink-soft">{n}</span>
            </span>
          ))}
        </div>
      </Section>

      <Section title="Components, light and dark side by side">
        <div className="grid gap-6 overflow-hidden rounded-none border-[length:var(--pane-gap)] border-night lg:grid-cols-2">
          <div>
            <p className="eyebrow px-6 pt-6">Light scene</p>
            <Gallery />
          </div>
          <div className="theme-dark border-t-[length:var(--pane-gap)] border-night lg:border-l lg:border-t-0">
            <p className="eyebrow px-6 pt-6 text-on-dark/80">Dark scene</p>
            <Gallery />
          </div>
        </div>
      </Section>
    </div>
  )
}
