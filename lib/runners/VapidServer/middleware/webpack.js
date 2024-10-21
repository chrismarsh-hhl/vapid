import middleware from 'koa-webpack';
import { makeWebpackConfig } from '../../../webpack_config.js';

/**
 * Initialize Webpack middleware
 *
 * @params {string} local - is this a local dev environment
 * @params {string} siteDir - path to website being served
 * @return {function}
 */
export const webpackMiddleware = async (local, assetDirs = [], moduleDirs = [], output = false) => {
  const mode = local ? 'development' : 'production';

  return middleware({
    devMiddleware: {
      logLevel: 'error',
      publicPath: '/',
    },
    hotClient: false,
    config: makeWebpackConfig(mode, assetDirs, moduleDirs, output),
  });
}
