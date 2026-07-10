import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // Trace the custom Prisma folder for all your backend API routes
    "/api/**/*": ["./app/generated/prisma/**/*"],
    // Trace it for standard app/pages routing entry points
    "/**/*": ["./app/generated/prisma/**/*"],
  },
};

export default nextConfig;
