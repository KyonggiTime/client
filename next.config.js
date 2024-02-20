/** @type {import('next').NextConfig} */
const nextBuildId = require('next-build-id');
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
  generateBuildId: () => nextBuildId({ dir: __dirname }),
}

module.exports = withPWA(nextConfig);
