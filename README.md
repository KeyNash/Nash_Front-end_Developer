# KeyNash Portfolio

An evidence-first portfolio for KeyNash, a product-focused developer in Kenya. The site presents ten client, personal, and concept projects without inventing metrics, outcomes, testimonials, or production readiness.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS with an editorial-tech design system
- Zod-validated project records
- Resend and React Email for server-side inquiries
- Vitest and Playwright verification

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://127.0.0.1:3000`.

The preserved root `index.html`, `styles.css`, and `script.js` files belong to the previous static portfolio and are not used by the Next.js runtime. They remain in place so existing user work is not discarded during the rebuild.

## Content editing

- `src/content/profile.ts` contains public identity and contact details.
- `src/content/projects.ts` contains the case-study records.
- Project records are validated during import. A build fails when a required field is missing or a non-current deployment exposes a live URL.
- Update public claims only from current repository evidence, observable behavior, an approved deployment, or facts Nash has confirmed.

Status values:

- `live-current` — verified deployment; a live URL may be shown.
- `live-stale` — current local build is documented, but the older deployment is withheld.
- `local-verified` — verified locally with no approved live deployment.
- `in-progress` — active product work with outstanding gates stated in the case study.

## Contact configuration

Copy `.env.example` to `.env.local` and configure:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=KeyNash <hello@your-verified-domain.com>
CONTACT_TO_EMAIL=nobertkinyanjui@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`RESEND_API_KEY` and the sender stay server-only. Production email must not be enabled until the sender domain is verified. Without valid email configuration, the form returns a clear fallback and the page keeps direct email and WhatsApp options visible.

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
npm.cmd run verify:browser
```

`verify:browser` expects a running local server and uses installed Microsoft Edge to check five routes at 320, 375, 768, 1024, and 1440 pixels. It also checks the mobile menu, theme toggle, work filter, contact fallback, stale-link safeguards, console errors, framework overlays, and horizontal overflow.

## Vercel preview

1. Set `NEXT_PUBLIC_SITE_URL` to the preview URL for preview verification.
2. Configure Resend only when a valid sender is available.
3. Create a preview deployment and rerun route, form, metadata, and link checks against that exact URL.
4. Promote only after Nash approves every classification, screenshot, project claim, and live link.

No production deployment is implied by a successful local build.
