import middleware from 'koa-webpack';
import config from '../../../webpack_config.js';

/**
 * Initialize Webpack middleware
 *
 * @params {string} local - is this a local dev environment
 * @params {string} siteDir - path to website being served
 * @return {function}
 */
export default function webpacker(local, assetDirs = [], moduleDirs = [], output = false) {
  const mode = local ? 'development' : 'production';

  return middleware({
    dev: {
      logLevel: 'error',
      publicPath: '/',
    },

    hot: false,

    config: config(mode, assetDirs, moduleDirs, output),
  });
};
