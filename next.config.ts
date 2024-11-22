import type { NextConfig } from 'next'

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Replace node: protocol imports with node_modules paths
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:stream': 'stream-browserify',
        'node:buffer': 'buffer',
        'node:util': 'util',
        'node:crypto': 'crypto-browserify',
        'node:assert': 'assert',
        'node:process': 'process/browser',
        'node:path': 'path-browserify',
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
        'node:zlib': false,
        'node:http': false,
        'node:https': false,
        'node:os': false,
        'node:querystring': false,
      }
    }
    return config
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      bodySizeLimit: '2mb'
    },
  },
}

export default config
