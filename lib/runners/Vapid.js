import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';

import Database from '../Database/index.js';
import Generator from '../generator.js';
import { Paths, Utils } from '../utils/index.js';

/**
 * This is the main class that powers Vapid projects.
 * It fetches projected environment variables, configuration options,
 * project paths and data storage information. Project runners, like
 * `VapidBuilder` or `VapidServer`, may extend this base class to easily
 * access project configuration and structure data.
 */
class Vapid {
  /**
   * This module works in conjunction with a site directory.
   *
   * @param {string} cwd - path to site
   * @return {Vapid}
   */
  constructor(cwd) {
    _loadEnv(cwd);
    this.env = process.env.NODE_ENV || 'development'; // Used by cli.js
    this.isDev = this.env === 'development' || this.env === 'test';
  }

  async initialize(cwd) {
    // User-defined options
    const pathname = path.resolve(cwd, 'package.json');
    // eslint-disable-next-line
    const {
      default: { vapid: options = {}, name },
    } = await import(pathname, { assert: { type: 'json' } });

    this.name = name;
    this.config = Utils.merge({}, _defaults.call(this), options);
    this.paths = Paths.getProjectPaths(cwd, this.config.dataPath);

    // Initialize database.
    const dbConfig = this.config.database;
    if (dbConfig.dialect === 'sqlite') {
      dbConfig.storage = path.resolve(this.paths.data, 'vapid.sqlite');
    }
    dbConfig.templatesPath = this.paths.www;
    this.db = new Database(dbConfig);
  }
}

/**
 * @private
 *
 * Default options
 *
 * @return {Object}
 */
function _defaults() {
  return {
    cache: !this.isDev,
    database: {
      dialect: 'sqlite',
      logging: false,
    },
    dataPath: './data',
    liveReload: this.isDev,
    placeholders: this.isDev,
    port: process.env.PORT || 3000,
  };
}

/**
 * @private
 *
 * Loads ENV via dotenv
 *
 * @param {string} cwd
 */
function _loadEnv(cwd) {
  const envPath = path.resolve(cwd, '.env');

  if (!process.env.SECRET_KEY && !fs.existsSync(envPath)) {
    Generator.copyEnv(cwd);
  }

  dotenv.config({ path: envPath });
}

export default Vapid;
