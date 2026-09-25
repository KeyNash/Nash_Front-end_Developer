"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

type FormState = { status: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "sending", message: "Sending your inquiry…" });
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "The inquiry could not be sent.");
      form.reset();
      setState({ status: "success", message: result.message || "Your inquiry was sent." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "The inquiry could not be sent." });
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-describedby="form-note form-status">
      <div className="field-grid">
        <label>Name<input name="name" autoComplete="name" minLength={2} maxLength={80} required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
      </div>
      <label>What are you building?<input name="project" maxLength={120} required placeholder="Website, product, store, mobile app…" /></label>
      <label>Message<textarea name="message" minLength={20} maxLength={2500} rows={7} required placeholder="Share the goal, audience and any useful constraints." /></label>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-footer">
        <p id="form-note">This form only sends when the server-side email configuration is ready.</p>
        <button className="button button-primary" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? <LoaderCircle className="spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
          {state.status === "sending" ? "Sending" : "Send inquiry"}
        </button>
      </div>
      <p id="form-status" className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}
