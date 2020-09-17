/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    trailingSlash: true,
    pageExtensions: ['jsx', 'tsx'],
    reactStrictMode: true,

    typescript: {
      ignoreBuildErrors: true,
    },
    webpack(config, options) {
      config.node = {
        fs: 'empty',
      };
      return config;
    },
  }),
);
