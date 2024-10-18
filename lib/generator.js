import fs from 'fs';
import { randomBytes } from 'crypto';
import { basename, resolve } from 'path';
import Boom from '@hapi/boom';

import { Utils } from './utils';
import pjson from '../package.json';

const templateDir = resolve(__dirname, '../site_template');

/**
 * Creates new site directories from a template
 */
class Generator {
  /*
   * @static
   *
   * Copies files for a new website
   *
   * @param {string} target - a file path
   */
  static copyTo(target) {
    if (fs.existsSync(target)) {
      throw new Boom('Target directory already exists.');
    }

    Utils.copyFiles(templateDir, target, {
      name: basename(target),
      package: pjson.name,
      version: pjson.version,
      secretKey: randomBytes(64).toString('hex'),
    });
  }

  /*
   * @static
   *
   * Regenerates .env file
   *
   * @param {string} target - a file path
   */
  static copyEnv(target) {
    const targetFile = resolve(target, '.env');
    const templateFile = resolve(templateDir, '.env.ejs');

    if (fs.existsSync(targetFile)) return;

    Utils.copyFile(templateFile, targetFile, {
      secretKey: randomBytes(64).toString('hex'),
    });
  }
}

export default Generator;
