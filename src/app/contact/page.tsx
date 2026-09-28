import type { Metadata } from "next";
import { ExternalLink, Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact", description: "Start a project conversation with KeyNash.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <section className="section shell page-top contact-layout">
      <div className="contact-copy">
        <p className="eyebrow">Start a conversation</p>
        <h1>Tell me what should work better.</h1>
        <p>Share the product, audience and problem. If the email service is not configured yet, the direct options below remain available.</p>
        <div className="contact-options">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} aria-hidden="true" /><span><small>Code & collaboration</small>GitHub profile</span></a>
          <a href={profile.gitlab} target="_blank" rel="noreferrer"><ExternalLink size={20} aria-hidden="true" /><span><small>More source code</small>GitLab profile</span></a>
          <a href={profile.linktree} target="_blank" rel="noreferrer"><ExternalLink size={20} aria-hidden="true" /><span><small>Profile directory</small>Linktree</span></a>
          <a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram size={20} aria-hidden="true" /><span><small>Build updates</small>Instagram</span></a>
          <a href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true" /><span><small>Email</small>{profile.email}</span></a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={20} aria-hidden="true" /><span><small>WhatsApp</small>Start a chat</span></a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
