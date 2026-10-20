import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const THIRTY_ONE_DAYS = 60 * 60 * 24 * 31;

// Files in public/ get `max-age=0` from Next by default, so every visit revalidates
// photos and videos. Their names are stable (not content-hashed), so use a long-but-finite
// TTL rather than `immutable`: replace an asset by giving it a new file name.
const longCache = [
  { key: "Cache-Control", value: `public, max-age=${THIRTY_ONE_DAYS}, stale-while-revalidate=86400` },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized variants of public/ images default to a 60s cache lifetime.
    minimumCacheTTL: THIRTY_ONE_DAYS,
  },
  experimental: {
    optimizePackageImports: ["@fortawesome/free-solid-svg-icons", "@fortawesome/free-brands-svg-icons"],
  },
  async headers() {
    return [
      { source: "/images/:path*", headers: longCache },
      { source: "/videos/:path*", headers: longCache },
    ];
  },
};

export default withNextIntl(nextConfig);
