/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // We use this to simplify the <Image> refactor
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
