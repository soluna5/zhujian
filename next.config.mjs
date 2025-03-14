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
  images: {
    unoptimized: true,
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
