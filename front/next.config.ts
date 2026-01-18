import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Next.js 16: Turbopack設定
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    // ワークスペースルートを明示的に指定
    root: process.cwd(),
  },
  // @napi-rs/canvas をサーバーサイドで外部化
  serverExternalPackages: ['@napi-rs/canvas'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // @napi-rs/canvas のネイティブバイナリをバンドルから除外
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
