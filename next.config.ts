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
};

export default nextConfig;
