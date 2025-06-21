import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // @napi-rs/canvas のネイティブバイナリをバンドルから除外
      // これにより、Webpackはこれを解析しようとせず、実行時にネイティブにロードされる
      config.externals.push({
        '@napi-rs/canvas': 'commonjs @napi-rs/canvas',
      });
    }
    return config;
  },
  outputFileTracingIncludes: {
    '*': ['public/fonts/**'],
  }
};

export default nextConfig;
