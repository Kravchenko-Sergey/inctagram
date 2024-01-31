/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'storage.yandexcloud.net',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        // pathname: '/users-inctagram/users/**',
        pathname: '/trainee-instagram-api/Image/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/profile',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
