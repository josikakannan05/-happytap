import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Use this project folder as root (avoids parent package-lock.json hijacking the workspace)
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;
