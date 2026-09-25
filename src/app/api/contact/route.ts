import { Resend } from "resend";
import { z } from "zod";
import { PortfolioInquiryEmail } from "@/emails/portfolio-inquiry";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  project: z.string().trim().min(2).max(120),
  message: z.string().trim().min(20).max(2500),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Please submit a valid inquiry." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Please check the highlighted information and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "nobertkinyanjui@gmail.com";

  if (!apiKey || !from) {
    return Response.json({ message: "Email is not configured yet. Please use WhatsApp or email KeyNash directly." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `Portfolio inquiry: ${parsed.data.project}`,
    react: PortfolioInquiryEmail(parsed.data),
  });

  if (error) {
    console.error("Portfolio inquiry delivery failed", { name: error.name });
    return Response.json({ message: "Email delivery is temporarily unavailable. Please use WhatsApp or email instead." }, { status: 502 });
  }

  return Response.json({ message: "Thanks — your inquiry has been sent to KeyNash." });
}
