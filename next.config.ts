import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        new URL('https://placehold.co/**'),
        new URL('https://cdn.weatherapi.com/**'),
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/relay-5LNQi9/static/:path*",
          destination: "https://eu-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/relay-5LNQi9/:path*",
          destination: "https://eu.i.posthog.com/:path*",
        },
      ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
