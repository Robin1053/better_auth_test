import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['https://lh3.googleusercontent.com/', 'avatars.githubusercontent.com'],
  },
  transpilePackages: ['mui-one-time-password-input'],

};

export default nextConfig;
