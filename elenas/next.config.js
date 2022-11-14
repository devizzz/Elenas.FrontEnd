/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ELENAS_API: 'https://elenasapi.azurewebsites.net'
  },
}

module.exports = nextConfig
