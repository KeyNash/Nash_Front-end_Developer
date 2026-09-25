const LOCAL_SITE_URL = "http://localhost:3000";

function asHttpsUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return asHttpsUrl(configuredUrl);

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  return vercelUrl ? asHttpsUrl(vercelUrl) : LOCAL_SITE_URL;
}
