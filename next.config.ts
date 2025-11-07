import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/countries/:path*',
  //       destination: 'https://www.apicountries.com/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
