/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: 'public',
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  fallbacks: {
    document: "/",
  },
});

const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: async () => {
    return process.env.GIT_HASH
  },
}

module.exports = withPWA(nextConfig);
