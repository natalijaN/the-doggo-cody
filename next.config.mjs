/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.dog.ceo"],
  },
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
