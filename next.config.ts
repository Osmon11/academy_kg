import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/i18n/request.ts",
);

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ilimnuru.kg",
        pathname: "/media/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
