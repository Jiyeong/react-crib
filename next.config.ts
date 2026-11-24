import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // images.domains는 Next 16에서 deprecated → remotePatterns 사용
    remotePatterns: [
      { protocol: 'https', hostname: '26.media.tumblr.com' },
      { protocol: 'https', hostname: 'cdn2.thecatapi.com' },
      { protocol: 'https', hostname: 'cdn2.thedogapi.com' },
      { protocol: 'https', hostname: 'media.tumblr.com' },
    ],
  },
};

export default nextConfig;
