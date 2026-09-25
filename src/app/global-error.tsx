"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="state-page shell"><p>Something went wrong.</p><button onClick={reset}>Try again</button></main></body></html>;
}
