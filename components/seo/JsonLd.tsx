/**
 * Inline JSON-LD script tag. Server-rendered so Google crawls the
 * structured data even without JS execution.
 *
 *   <JsonLd id="org" data={organizationSchema()} />
 *
 * Pre-stringifies the payload in JSX to dodge React 19's nuanced
 * handling of `dangerouslySetInnerHTML` content on `<script>` tags
 * inside `<head>` — placing the literal JSON text as a single string
 * child via `dangerouslySetInnerHTML` works in every Next.js + React
 * combination we've shipped against.
 */
export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      id={id}
      // Escape `</` to keep the closing tag from accidentally terminating
      // the script early if a string value ever contains "</script".
      dangerouslySetInnerHTML={{
        __html: json.replace(/<\/script/gi, "<\\/script"),
      }}
    />
  );
}
