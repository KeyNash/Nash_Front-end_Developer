"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="state-page shell"><p className="eyebrow">Something went wrong</p><h1>The page could not be loaded.</h1><p>No data was changed. You can try the request again.</p><button className="button button-primary" onClick={reset}>Try again</button></section>;
}
