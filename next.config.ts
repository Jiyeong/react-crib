import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: [
      '26.media.tumblr.com',
      'cdn2.thecatapi.com',
      'cdn2.thedogapi.com',
      'media.tumblr.com'
    ],

  },

};

export default nextConfig;
