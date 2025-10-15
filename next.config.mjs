/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "dqmqaxwogx6sq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
