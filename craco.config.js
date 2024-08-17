module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
      });
      return webpackConfig;
    },
  },
};

