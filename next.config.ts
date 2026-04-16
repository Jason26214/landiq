import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/landiq',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/landiq',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
