/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const nextBuildId = require('next-build-id');
const withPWA = require("next-pwa")({
  dest: 'public',
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  runtimeCaching,
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
