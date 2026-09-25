import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";

export function PortfolioInquiryEmail({ name, email, project, message }: { name: string; email: string; project: string; message: string }) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio inquiry from {name}</Preview>
      <Body style={{ backgroundColor: "#f4f0e8", color: "#171c1f", fontFamily: "Arial, sans-serif", padding: "32px 12px" }}>
        <Container style={{ backgroundColor: "#ffffff", border: "1px solid #d8d3c8", borderRadius: "18px", margin: "0 auto", maxWidth: "620px", padding: "32px" }}>
          <Text style={{ color: "#007f8b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>KeyNash portfolio inquiry</Text>
          <Heading style={{ fontSize: "28px", margin: "8px 0 24px" }}>{project}</Heading>
          <Text><strong>From:</strong> {name}</Text>
          <Text><strong>Reply to:</strong> {email}</Text>
          <Hr style={{ borderColor: "#d8d3c8", margin: "24px 0" }} />
          <Text style={{ fontSize: "16px", lineHeight: "1.65", whiteSpace: "pre-wrap" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
