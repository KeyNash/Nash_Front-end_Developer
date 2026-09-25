import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">KeyNash · Kenya</p>
          <h2>Build the useful thing.</h2>
        </div>
        <div className="footer-links" aria-label="Footer links">
          <Link href="/work">Selected work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Start a conversation</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="footer-note">Evidence-led case studies. No invented metrics, outcomes or client claims.</p>
      </div>
    </footer>
  );
}
