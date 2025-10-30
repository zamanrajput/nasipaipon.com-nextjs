/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    // 🚫 Completely disable ESLint checks during builds
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
