/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: Using console.log here to log the env variables
    console.log('Build Environment:', process.env.NODE_ENV);
    console.log('Custom Environment Config:', process.env.NEXT_PUBLIC_ENV);
    console.log('Custom Environment NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    return config;
  },
};

module.exports = nextConfig;
