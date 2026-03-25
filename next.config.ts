import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/landiq',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
