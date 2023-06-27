/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  serverRuntimeConfig: {
    COIN_MARKETCAP_API_KEY: '0dd01359-af6f-47f4-9857-f4a5d1592ee7'
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/shop-opening',
      //   permanent: true,
      // },
      // {
      //   source: '/shop-item-detail/[id]',
      //   destination: '/shop-opening',
      //   permanent: true,
      // },
    ]
  },
  
}

module.exports = nextConfig
