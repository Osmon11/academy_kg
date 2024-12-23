import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // localPatterns: [
    //   {
    //     pathname:
    //       "/src/shared/assets/backgrounds/**",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
