/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lxwhaswevghijamz.public.blob.vercel-storage.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

export default nextConfig;