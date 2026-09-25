import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Verified client, personal and concept work by KeyNash.", alternates: { canonical: "/work" } };

const filters = ["All", "Client work", "Personal work", "Concept work"] as const;

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const active = filters.includes(type as (typeof filters)[number]) ? type : "All";
  const visible = active === "All" ? projects : projects.filter((project) => project.classification === active);
  return (
    <section className="section shell page-top">
      <div className="page-heading">
        <p className="eyebrow">Project archive · {projects.length} records</p>
        <h1>Work, with the useful details left in.</h1>
        <p>Client websites, product concepts and active builds. Status labels and limitations are part of every story.</p>
      </div>
      <nav className="filter-bar" aria-label="Filter projects">
        {filters.map((filter) => <Link key={filter} className={active === filter ? "active" : ""} href={filter === "All" ? "/work" : `/work?type=${encodeURIComponent(filter)}`}>{filter}</Link>)}
      </nav>
      <div className="project-grid archive-grid">
        {visible.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index < 2} />)}
      </div>
    </section>
  );
}
