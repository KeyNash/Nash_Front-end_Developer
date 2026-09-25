import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "About", description: "How KeyNash approaches product, interface and full-stack development.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <section className="about-hero shell page-top">
        <p className="eyebrow">About KeyNash</p>
        <h1>I care about the part where an interface becomes a dependable product.</h1>
        <div className="about-intro"><p>{profile.introduction}</p><p>I work across product thinking, front-end systems, APIs and mobile workflows. The common thread is clarity: people should understand what a product does, what it does not do yet, and what happens when something goes wrong.</p></div>
      </section>
      <section className="band-dark section">
        <div className="shell approach-grid">
          <div><p className="eyebrow">My working lens</p><h2>Interface craft backed by system thinking.</h2></div>
          <div className="approach-list">
            <article><span>01</span><h3>Shape the product</h3><p>Clarify the audience, core task, boundaries and evidence before decorating the interface.</p></article>
            <article><span>02</span><h3>Build the flow</h3><p>Use the smallest appropriate stack, then make loading, error and empty states part of the main experience.</p></article>
            <article><span>03</span><h3>Verify the claim</h3><p>Test the route, transaction or device behavior that supports every important public statement.</p></article>
          </div>
        </div>
      </section>
      <section className="section shell capabilities-grid">
        <div><p className="eyebrow">Capabilities</p><h2>Where I contribute.</h2></div>
        <div className="capability-columns">
          <article><h3>Product & interface</h3><p>Product framing, information architecture, responsive UI, accessibility and interaction design.</p></article>
          <article><h3>Web engineering</h3><p>Next.js and React applications, typed content systems, APIs, Django backends and deployment preparation.</p></article>
          <article><h3>Mobile & local-first</h3><p>Flutter interfaces, resilient offline workflows, local persistence, transaction integrity and device validation.</p></article>
        </div>
      </section>
      <section className="cta shell"><p className="eyebrow">See it in context</p><h2>The case studies include the decisions, limitations and evidence.</h2><Link className="button button-primary" href="/work">Explore the work <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
    </>
  );
}
