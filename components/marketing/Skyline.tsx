/**
 * Portsmouth skyline silhouette: Spinnaker Tower, cathedral cupola, harbour
 * masts, tower blocks and terraced roofs. Drawn as one flat shape in
 * currentColor so the parent sets the tone. Decorative only.
 */
export function Skyline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 420"
      preserveAspectRatio="xMaxYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* terraced roofs, left */}
        <path d="M0 420V330l40-22 40 22v-26l40-22 40 22v-20l40-22 40 22v26l40-22 40 22V420Z" />
        {/* cathedral tower and cupola */}
        <rect x="372" y="236" width="52" height="184" />
        <rect x="364" y="226" width="68" height="14" />
        <path d="M378 226h40v-34h-8v-14l-12-24-12 24v14h-8Z" />
        <rect x="396" y="136" width="4" height="22" />
        <rect x="430" y="300" width="120" height="120" />
        <path d="M430 300l60-34 60 34Z" />
        {/* tower blocks */}
        <rect x="570" y="210" width="46" height="210" />
        <rect x="620" y="260" width="38" height="160" />
        <rect x="662" y="190" width="54" height="230" />
        <rect x="720" y="280" width="40" height="140" />
        {/* HMS Warrior: hull and three masts with yards */}
        <path d="M790 336h190l-14 26H806Z" />
        <rect x="834" y="190" width="4" height="148" />
        <rect x="884" y="164" width="4" height="174" />
        <rect x="934" y="196" width="4" height="142" />
        <rect x="822" y="214" width="28" height="3" />
        <rect x="822" y="244" width="28" height="3" />
        <rect x="872" y="190" width="28" height="3" />
        <rect x="872" y="222" width="28" height="3" />
        <rect x="922" y="226" width="28" height="3" />
        {/* Gunwharf and waterfront blocks */}
        <rect x="990" y="300" width="64" height="120" />
        <rect x="1058" y="262" width="44" height="158" />
        <rect x="1106" y="318" width="38" height="102" />
        {/* Spinnaker Tower: sail, deck, mast */}
        <path d="M1160 420c26-80 40-170 44-240h16c4 70 54 160 70 240Z" />
        <rect x="1190" y="168" width="44" height="20" rx="8" />
        <rect x="1210" y="30" width="4" height="140" />
        <rect x="1205" y="30" width="14" height="4" />
        {/* right-hand blocks and roofs */}
        <rect x="1320" y="290" width="46" height="130" />
        <rect x="1370" y="240" width="40" height="180" />
        <rect x="1414" y="306" width="46" height="114" />
        <path d="M1460 420V340l40-22 40 22v-20l40-22 60 42V420Z" />
      </g>
    </svg>
  )
}
