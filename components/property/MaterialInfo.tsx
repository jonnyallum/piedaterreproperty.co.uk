/**
 * MaterialInfo. The material information a sales listing must carry at the point
 * of marketing under the Digital Markets, Competition and Consumers Act,
 * presented plainly and grouped rather than buried in a wall of prose. Only
 * fields we hold are shown; the schema already guarantees the required ones are
 * present, so this never renders a blank.
 */
import { Icon, type IconName } from '@/components/primitives/Icon'
import { gbp, list } from '@/lib/format'
import type { MaterialInformation } from '@/lib/schemas/property'

interface Row {
  label: string
  value: string
}

interface Group {
  icon: IconName
  title: string
  rows: Row[]
}

function tenureLabel(t: MaterialInformation['tenure']): string {
  return t === 'share_of_freehold' ? 'Share of freehold' : t.charAt(0).toUpperCase() + t.slice(1)
}

function groupsFor(info: MaterialInformation): Group[] {
  const tenure: Row[] = [{ label: 'Tenure', value: tenureLabel(info.tenure) }]
  if (info.leaseYearsRemaining != null)
    tenure.push({ label: 'Lease remaining', value: `${info.leaseYearsRemaining} years` })
  if (info.groundRent != null)
    tenure.push({ label: 'Ground rent', value: `${gbp(info.groundRent)} per year` })
  if (info.serviceCharge != null)
    tenure.push({ label: 'Service charge', value: `${gbp(info.serviceCharge)} per year` })
  tenure.push({ label: 'Council tax', value: `Band ${info.councilTaxBand}` })

  const services: Row[] = [
    { label: 'Heating', value: info.heating },
    {
      label: 'Broadband',
      value: info.broadband.maxDownloadMbps
        ? `${info.broadband.type}, up to ${info.broadband.maxDownloadMbps} Mbps`
        : info.broadband.type,
    },
  ]
  if (info.mobileCoverage) services.push({ label: 'Mobile coverage', value: info.mobileCoverage })

  const build: Row[] = [
    { label: 'Construction', value: info.construction },
    { label: 'Parking', value: info.parking.length ? list(info.parking) : 'None' },
  ]
  if (info.accessibility?.length)
    build.push({ label: 'Accessibility', value: list(info.accessibility) })

  const risks: Row[] = [{ label: 'Flood risk', value: info.floodRisk }]
  if (info.rightsOfWay) risks.push({ label: 'Rights of way', value: info.rightsOfWay })
  if (info.restrictions) risks.push({ label: 'Restrictions', value: info.restrictions })
  if (info.knownIssues?.length) risks.push({ label: 'Known issues', value: list(info.knownIssues) })

  return [
    { icon: 'key', title: 'Tenure and charges', rows: tenure },
    { icon: 'flame', title: 'Utilities and connectivity', rows: services },
    { icon: 'home', title: 'Construction and access', rows: build },
    { icon: 'shield', title: 'Rights and risks', rows: risks },
  ]
}

export function MaterialInfo({ info }: { info: MaterialInformation }) {
  const groups = groupsFor(info)
  return (
    <section aria-labelledby="material-info" className="rounded-none border-[length:var(--pane-gap)] border-night bg-well p-6 md:p-8">
      <h2 id="material-info" className="text-h3">
        Material information
      </h2>
      <p className="measure mt-2 text-small text-ink-soft">
        The facts you are entitled to before you enquire, set out under the Digital Markets,
        Competition and Consumers Act.{' '}
        <a href="/material-information" className="text-sales-ink underline">
          What is material information?
        </a>
      </p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="flex items-center gap-2 text-body font-medium text-ink">
              <Icon name={group.icon} className="h-5 w-5 text-brass" />
              {group.title}
            </h3>
            <dl className="mt-3 flex flex-col gap-2">
              {group.rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 border-b-[length:var(--pane-gap)] border-night pb-2 text-small">
                  <dt className="text-ink-soft">{row.label}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}
