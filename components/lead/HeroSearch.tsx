/**
 * HeroSearch. A native GET form keeps the homepage search useful before any
 * JavaScript runs and avoids making the largest page hydrate a modal solely to
 * collect four query parameters. The results page reads these exact fields.
 */
import { SelectField } from '@/components/primitives/Field'
import { Icon } from '@/components/primitives/Icon'
import { COVERAGE_PLACES } from '@/lib/site'

const ALL_TOWNS = COVERAGE_PLACES

export function HeroSearch() {
  return (
    <form
      action="/properties"
      method="get"
      aria-label="Search properties"
      className="grid gap-5 rounded-none border-2 border-ink bg-ground p-5 shadow-warm-lg md:grid-cols-[auto_1.3fr_1fr_1fr_auto] md:items-end md:p-6"
    >
      <fieldset>
        <legend className="field-label">Looking for</legend>
        <div className="inline-flex rounded-sm bg-well p-1" role="radiogroup">
          <label className="cursor-pointer">
            <input className="peer sr-only" type="radio" name="path" value="sales" defaultChecked />
            <span className="inline-flex min-h-11 items-center rounded-sm px-4 text-small font-medium text-ink peer-checked:bg-sales-deep peer-checked:text-on-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
              Buying
            </span>
          </label>
          <label className="cursor-pointer">
            <input className="peer sr-only" type="radio" name="path" value="lettings" />
            <span className="inline-flex min-h-11 items-center rounded-sm px-4 text-small font-medium text-ink peer-checked:bg-lettings-fill peer-checked:text-on-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
              Renting
            </span>
          </label>
        </div>
      </fieldset>

      <div className="flex flex-col">
        <label htmlFor="hero-location" className="field-label">
          Location
        </label>
        <input
          id="hero-location"
          name="town"
          list="hero-towns"
          className="field-control"
          placeholder="Town or area"
          autoComplete="off"
        />
        <datalist id="hero-towns">
          {ALL_TOWNS.map((town) => (
            <option key={town} value={town} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col">
        <label htmlFor="hero-price" className="field-label">
          Maximum £
        </label>
        <input
          id="hero-price"
          name="maxPrice"
          type="number"
          min="0"
          step="50"
          inputMode="numeric"
          className="field-control tabular"
          placeholder="No maximum"
        />
      </div>

      <SelectField id="hero-beds" label="Bedrooms" name="minBeds" defaultValue="">
        <option value="">Any</option>
        {[1, 2, 3, 4, 5].map((bedrooms) => (
          <option key={bedrooms} value={bedrooms}>
            {bedrooms}+
          </option>
        ))}
      </SelectField>

      <button type="submit" className="btn btn-sales">
        <Icon name="arrow-right" className="h-5 w-5" />
        Search
      </button>
    </form>
  )
}
