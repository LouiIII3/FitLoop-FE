import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
      ...(process.env.NEXT_PUBLIC_IMAGE_BUCKET_HOST ? [{
        protocol: 'https' as const,
        hostname: process.env.NEXT_PUBLIC_IMAGE_BUCKET_HOST,
        pathname: '**',
      }] : []),
    ],
  },
};

export default nextConfig;
