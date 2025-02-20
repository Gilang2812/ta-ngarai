import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'http',
        hostname: 'localhost', 
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      }
    ]
  }
};

export default nextConfig;
