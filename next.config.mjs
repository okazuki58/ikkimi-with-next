/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  images: {
    domains: ['xcclmezluzvwbewszwtw.supabase.co'],
  },
};

export default nextConfig;
