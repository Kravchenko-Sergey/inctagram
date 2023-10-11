/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
