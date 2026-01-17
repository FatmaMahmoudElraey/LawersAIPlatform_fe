// next.config.js
/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // Your configuration here
  reactStrictMode: true,
  //   i18n: {
  //   locales: ['en', 'ar'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
  // If you were using TypeScript-specific features, convert them:
  // Remove TypeScript-only syntax
};

module.exports = withNextIntl(nextConfig);
