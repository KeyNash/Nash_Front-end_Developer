import { ImageResponse } from "next/og";

export const alt = "KeyNash — Product-focused developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#101718", color: "#f4f1e9", padding: "70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#5fe0e8", fontSize: 28, fontWeight: 700 }}>&lt;NK_gDev/&gt;</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 74, fontWeight: 700, letterSpacing: "-4px" }}>Useful products.</div><div style={{ display: "flex", fontSize: 74, color: "#5fe0e8", fontWeight: 700, letterSpacing: "-4px" }}>Clear evidence.</div></div>
      <div style={{ display: "flex", fontSize: 24, color: "#a9b2b1" }}>KeyNash · Product-focused developer · Kenya</div>
    </div>,
    size,
  );
}
