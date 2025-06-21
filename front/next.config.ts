import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trustHost: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
