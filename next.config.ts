// next.config.js
/** @type {import('next').NextConfig} */
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
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
} as NextConfig;

export default withNextIntl(nextConfig);
