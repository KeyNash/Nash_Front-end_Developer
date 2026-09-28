import { describe, expect, it } from "vitest";
import { developerProfiles, profile } from "./profile";

describe("public profile links", () => {
  it("keeps the verified developer profiles available", () => {
    expect(developerProfiles).toEqual([
      { label: "GitHub", href: "https://github.com/KeyNash" },
      { label: "GitLab", href: "https://gitlab.com/KeyNash" },
      { label: "Linktree", href: "https://linktr.ee/Nashie2" },
      { label: "Instagram", href: "https://www.instagram.com/nash_web_d3v/" },
    ]);
  });

  it("keeps the direct contact destinations explicit", () => {
    expect(profile.email).toBe("nobertkinyanjui@gmail.com");
    expect(profile.whatsapp).toBe("https://wa.me/254755228773");
  });
});
