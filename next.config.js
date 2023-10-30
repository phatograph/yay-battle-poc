module.exports = {
  output: 'standalone',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'js-yaml-loader',
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
    })

    // https://github.com/webpack/webpack/issues/196#issuecomment-889603503
    // config.module.exprContextCritical = false

    return config
  },
}
