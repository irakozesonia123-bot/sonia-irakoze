import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/cubesat-and-aero-design", destination: "/work/cubesat-structures", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      // Pages consolidated in the November 2026 redesign
      { source: "/workbench", destination: "/work", permanent: true },
      { source: "/journey", destination: "/about#journey", permanent: true },
      { source: "/field-notes", destination: "/about#events", permanent: true },
      { source: "/recognition", destination: "/about#recognition", permanent: true },
      { source: "/on-the-record", destination: "/about#media", permanent: true },
      { source: "/work/aero-design-glider", destination: "/work/aero-design", permanent: true },
    ];
  },
};

export default nextConfig;
