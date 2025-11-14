import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX extensions
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Fix ESLint di server (biar gak blok build)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Transpile packages
  transpilePackages: ["next-mdx-remote"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },

  // Safe optimizations that Next.js 15 still supports
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Remove deprecated/unrecognized options (Next 15)
  // ❌ swcMinify
  // ❌ optimizeCss

  experimental: {
    optimizePackageImports: ["@once-ui-system/core"],
  },
};

export default withMDX(nextConfig);
