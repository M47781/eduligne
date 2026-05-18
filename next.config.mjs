/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // basePath: '/eduligne',
  // assetPrefix: '/eduligne/',
  images: {
    unoptimized: true, // We use this to simplify the <Image> refactor
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
