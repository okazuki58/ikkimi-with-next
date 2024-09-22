/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;
