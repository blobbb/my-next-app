import path from "path";
import { fileURLToPath } from "url";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawMdxLoaderPath = path.join(__dirname, "loaders", "raw-mdx-loader.cjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx$/i,
      resourceQuery: /raw/,
      use: [
        {
          loader: rawMdxLoaderPath,
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();
