"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const stored = window.localStorage.getItem("keynash-theme");
    const shouldUseDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("keynash-theme", next ? "dark" : "light");
  }

  return (
    <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
      <Moon className="theme-moon" aria-hidden="true" size={18} />
      <Sun className="theme-sun" aria-hidden="true" size={18} />
    </button>
  );
}
