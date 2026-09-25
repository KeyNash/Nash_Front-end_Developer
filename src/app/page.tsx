import { ArrowDownRight, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects, projects } from "@/content/projects";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Product-focused developer · Kenya</p>
          <h1>I turn real problems into <em>clear digital products.</em></h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="button-row">
            <Link className="button button-primary" href="/work">Explore the work <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link className="button button-secondary" href="/contact">Start a conversation</Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Current focus">
          <p className="eyebrow">Now building</p>
          <strong>JuaDuka POS</strong>
          <p>An offline-first Android POS moving through its final internal-alpha validation gates.</p>
          <Link className="text-link" href="/work/juaduka-pos">See the honest build status <ArrowDownRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="principles band-dark">
        <div className="shell principles-grid">
          <p className="eyebrow">How I work</p>
          {profile.principles.map((principle, index) => (
            <div className="principle" key={principle}><span>0{index + 1}</span><p>{principle}</p></div>
          ))}
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="Selected work" title="Products with their boundaries left intact." copy="Each case study separates what works today from what is still local, illustrative or in progress." />
        <div className="project-grid featured-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index < 2} />)}
        </div>
        <div className="section-action"><Link className="button button-secondary" href="/work">View all {projects.length} projects <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </section>

      <section className="section evidence-section">
        <div className="shell evidence-grid">
          <SectionHeading eyebrow="Evidence first" title="A portfolio that says exactly what the work proves." />
          <div className="evidence-points">
            {["Observable features before promotional language.", "Repository and test records before performance claims.", "Clear labels for concepts, client work and active builds.", "No invented users, revenue, testimonials or outcomes."].map((item) => (
              <p key={item}><CheckCircle2 size={19} aria-hidden="true" />{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="cta shell">
        <p className="eyebrow">Have a useful idea?</p>
        <h2>Let’s make it understandable, dependable and ready to be used.</h2>
        <Link className="button button-primary" href="/contact">Tell me about it <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </>
  );
}
