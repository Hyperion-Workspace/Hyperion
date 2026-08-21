import type { NextConfig } from "next";
import createNextIntlPlugin from "./src/i18n/plugin";

// For Tauri static export, configure next-intl without server-side request config
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_IS_NATIVE: "true",
  },
};

export default withNextIntl(nextConfig) as NextConfig;
