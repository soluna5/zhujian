let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lmlswmelhqmokeeovrka.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    domains: ['lmlswmelhqmokeeovrka.supabase.co'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: 'standalone'
}

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig
  }

  const mergedConfig = { ...baseConfig }
  
  for (const key in userConfig) {
    if (
      typeof mergedConfig[key] === 'object' &&
      !Array.isArray(mergedConfig[key])
    ) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...userConfig[key],
      }
    } else {
      mergedConfig[key] = userConfig[key]
    }
  }

  return mergedConfig
}

const finalConfig = mergeConfig(nextConfig, userConfig?.default)

export default finalConfig
