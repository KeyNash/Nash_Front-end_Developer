import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = ["", "/work", "/about", "/contact"];
  return [...routes.map((route) => ({ url: `${base}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : .8 })), ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, changeFrequency: "monthly" as const, priority: .7 }))];
}
