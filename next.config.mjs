/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbminjrcaclilqvdjqdo.supabase.co", // Supabase storage domain
        port: "", // Leave empty for default ports
        pathname: "/storage/v1/object/public/productImages/**", // Match all images in the productImages folder
      },
    ],
  },
};

export default nextConfig;
