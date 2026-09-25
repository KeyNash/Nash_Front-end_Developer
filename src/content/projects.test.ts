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
    expect(juaduka?.limitations.join(" ")).toMatch(/eight-hour soak/i);
    expect(juaduka?.limitations.join(" ")).toMatch(/Daraja/i);
  });
});
