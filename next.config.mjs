/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  images: {
    remotePatterns: [
      // Supabaseストレージからの画像を許可
      {
        protocol: "https",
        hostname: "xcclmezluzvwbewszwtw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/ikkimi-image/**",
      },
      // Googleユーザーアバター画像を許可
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // すべてのパスを許可
      },
    ],
  },
};

export default nextConfig;
