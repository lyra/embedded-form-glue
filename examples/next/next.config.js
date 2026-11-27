/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  outputFileTracingRoot: path.join(__dirname, '../..'),
  transpilePackages: ['@lyracom/embedded-form-glue']
}

module.exports = nextConfig
