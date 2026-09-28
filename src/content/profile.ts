export const profile = {
  name: "Nobert Kinyanjui",
  publicName: "KeyNash",
  title: "Product-focused developer",
  location: "Kenya",
  email: "nobertkinyanjui@gmail.com",
  whatsapp: "https://wa.me/254755228773",
  github: "https://github.com/KeyNash",
  gitlab: "https://gitlab.com/KeyNash",
  linktree: "https://linktr.ee/Nashie2",
  instagram: "https://www.instagram.com/nash_web_d3v/",
  introduction: "I design and build useful digital products, from clear client websites to full-stack commerce systems and offline-first mobile tools.",
  principles: [
    "Make the product understandable before making it impressive.",
    "Keep money, stock and sensitive state authoritative and recoverable.",
    "Treat accessibility and honest product boundaries as engineering requirements.",
  ],
} as const;

export const developerProfiles = [
  { label: "GitHub", href: profile.github },
  { label: "GitLab", href: profile.gitlab },
  { label: "Linktree", href: profile.linktree },
  { label: "Instagram", href: profile.instagram },
] as const;
