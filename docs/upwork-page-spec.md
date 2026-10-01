# Upwork portfolio page specification

Purpose: give prospective Upwork clients a focused overview of Nobert Kinyanjui's Flutter/Android, web, and Django work, aligned with the supplied profile screenshot.
Delivery: standalone public/upwork.html and public/upwork.css in the existing portfolio repository; local preview only pending publication approval.
Content: Flutter-first hero; JuaDuka internal-alpha case study; MAMU and Chellah website examples; Nexa backend/commerce example; services, working process and Upwork contact link.
Evidence: src/content/projects.ts; JuaDuka docs/day-21-status.md (29 September 2026); user-supplied Upwork profile screenshot.
Constraints: no invented business outcomes, testimonials or operating payment integrations. JuaDuka remains in development; physical release gates remain open. Nexa public frontend is separate from backend implementation. Reuse existing owned imagery. No copied private account details, hourly rate, or live availability claims.
Design: independent editorial page, ink/ivory palette, lime accents, large typography, responsive stacked layouts, accessible native disclosure details, no external font or script dependencies.
Acceptance: all local assets load; 320/375/768/1440px layouts have no horizontal overflow; anchor navigation and case-study disclosures work by keyboard; contact links match screenshot profile URL; no runtime errors.

## Verification — 1 October 2026
- Microsoft Edge browser checks passed at 320, 375, 768, and 1440 CSS pixels.
- No horizontal overflow; all three content images loaded at each width.
- JuaDuka disclosure opened and closed using keyboard Enter.
- Selected-work navigation reached #work.
- No JavaScript page errors.
- Desktop and mobile full-page captures inspected visually.
- Contact URL transcribed from supplied screenshot; external account availability was not tested.
- Local preview: http://127.0.0.1:4189/upwork.html. Production path after an approved deployment: /upwork.html.
- Page is standalone static HTML/CSS and requires no new dependencies. Existing Next.js application code is unchanged.
