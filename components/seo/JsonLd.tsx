/**
 * JsonLd. Injects a structured-data script. The payload is serialised on the
 * server; keys come only from our own builders in lib/seo, never user input.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Structured data is not user content; this is our own object graph.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
