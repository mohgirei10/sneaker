/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to stay inside the current folder
  experimental: {
    turbo: {
      root: '.',
    },
  },
};

export default nextConfig;