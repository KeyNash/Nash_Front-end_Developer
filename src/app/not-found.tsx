import Link from "next/link";

export default function NotFound() {
  return <section className="state-page shell"><p className="eyebrow">404 · Not found</p><h1>That page is not part of this build.</h1><p>The project may have moved, or the address may be incomplete.</p><Link className="button button-primary" href="/work">Return to the work</Link></section>;
}
