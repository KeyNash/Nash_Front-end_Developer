import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { projectStatusLabels } from "@/content/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <Link className={`project-image project-image-${project.slug}`} href={`/work/${project.slug}`} aria-label={`Read ${project.title} case study`}>
        <Image src={project.cover} alt={project.coverAlt} fill sizes="(max-width: 760px) 100vw, 50vw" priority={priority} />
      </Link>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.classification}</span>
          <span className={`status status-${project.status}`}>{projectStatusLabels[project.status]}</span>
        </div>
        <p className="project-kicker">{project.kicker}</p>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="stack-list" aria-label="Technology">
          {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
        </div>
        <Link className="text-link" href={`/work/${project.slug}`}>View case study <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
