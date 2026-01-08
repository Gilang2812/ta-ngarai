/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
      {
        protocol: "https",
        hostname: "ta-be-production.up.railway.app",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
