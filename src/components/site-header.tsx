"use client";

import { Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)} aria-label="KeyNash home">
          <span aria-hidden="true">&lt;</span>
          <strong>NK_gDev</strong>
          <span aria-hidden="true">/&gt;</span>
        </Link>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="icon-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open KeyNash on GitHub">
            <Github aria-hidden="true" size={19} />
          </a>
          <ThemeToggle />
          <button className="icon-button menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
