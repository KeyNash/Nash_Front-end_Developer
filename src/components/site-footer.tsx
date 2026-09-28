import Link from "next/link";
import { developerProfiles, profile } from "@/content/profile";

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
          {developerProfiles.map((item) => <a key={item.label} href={item.href} target="_blank" rel="me noreferrer">{item.label}</a>)}
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <p className="footer-note">Evidence-led case studies. No invented metrics, outcomes or client claims.</p>
      </div>
    </footer>
  );
}
