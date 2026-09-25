import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, projectStatusLabels } from "@/content/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, images: [{ url: project.cover, alt: project.coverAlt }] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectData = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.summary, creator: { "@type": "Person", name: "Nobert Kinyanjui", alternateName: "KeyNash" }, keywords: project.stack.join(", ") };

  return (
    <article className="case-study">
      <header className="case-hero shell page-top">
        <Link className="back-link" href="/work"><ArrowLeft size={17} aria-hidden="true" /> All work</Link>
        <div className="case-title-grid">
          <div>
            <div className="project-meta"><span>{project.classification}</span><span className={`status status-${project.status}`}>{projectStatusLabels[project.status]}</span></div>
            <p className="project-kicker">{project.kicker}</p>
            <h1>{project.title}</h1>
          </div>
          <p className="case-summary">{project.summary}</p>
        </div>
        <div className="case-actions">
          {project.liveUrl ? <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <ArrowUpRight size={17} aria-hidden="true" /></a> : null}
          {project.repositoryUrl ? <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> View repository</a> : null}
        </div>
      </header>

      <div className={`case-cover case-cover-${project.slug}`}>
        <Image src={project.cover} alt={project.coverAlt} fill priority sizes="100vw" />
      </div>

      <div className="case-body shell">
        <aside className="case-facts">
          <div><span>Classification</span><strong>{project.classification}</strong></div>
          <div><span>Status</span><strong>{projectStatusLabels[project.status]}</strong></div>
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Technology</span><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        </aside>
        <div className="case-narrative">
          <section><p className="eyebrow">Overview</p>{project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
          <section><p className="eyebrow">The challenge</p><h2>{project.challenge}</h2></section>
          <section><p className="eyebrow">The response</p><p>{project.solution}</p></section>
          <section>
            <p className="eyebrow">Verified capabilities</p>
            <ul className="detail-list">{project.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="limits-panel">
            <p className="eyebrow">Current boundaries</p>
            <ul className="detail-list">{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </div>

      <section className="screenshots shell">
        <div className="section-heading"><p className="eyebrow">Visual evidence</p><h2>Recorded from the project.</h2></div>
        <div className={`screenshot-grid screenshot-count-${project.screenshots.length}`}>
          {project.screenshots.map((screenshot) => (
            <figure key={screenshot.src}>
              <div className="screenshot-frame"><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 760px) 100vw, 72vw" /></div>
              <figcaption>{screenshot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="evidence-note shell">
        <p className="eyebrow">Evidence trail</p>
        <p>This case study was prepared from current repository material and recorded verification evidence:</p>
        <ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectData).replace(/</g, "\\u003c") }} />
    </article>
  );
}
