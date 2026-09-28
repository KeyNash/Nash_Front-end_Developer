import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("portfolio project records", () => {
  it("contains ten unique project slugs", () => {
    expect(projects).toHaveLength(10);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  });

  it("exposes live URLs only for current deployments", () => {
    for (const project of projects) {
      if (project.liveUrl) expect(project.status).toBe("live-current");
      if (project.status === "live-stale") expect(project.liveUrl).toBeUndefined();
    }
  });

  it("keeps JuaDuka truthfully marked as in progress", () => {
    const juaduka = projects.find((project) => project.slug === "juaduka-pos");
    expect(juaduka?.status).toBe("in-progress");
    expect(juaduka?.repositoryUrl).toBeUndefined();
    expect(juaduka?.limitations.join(" ")).toMatch(/eight-hour soak/i);
    expect(juaduka?.limitations.join(" ")).toMatch(/Daraja/i);
  });

  it("publishes Nexa and Tamu only as verified frontend demonstrations", () => {
    const nexa = projects.find((project) => project.slug === "nexa-mobile");
    const tamu = projects.find((project) => project.slug === "tamu-kenya");

    expect(nexa?.liveUrl).toBe("https://nexa-mobile-demo.vercel.app/");
    expect(tamu?.liveUrl).toBe("https://tamu-kenya-demo.vercel.app/");
    expect(nexa?.limitations.join(" ")).toMatch(/frontend demonstration/i);
    expect(tamu?.limitations.join(" ")).toMatch(/frontend demonstration/i);
  });
});
