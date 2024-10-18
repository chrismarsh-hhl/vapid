import fs from 'fs';
import { basename, join } from 'path';
import { Utils } from '../../../utils';

fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js') return;
  if (file.startsWith('.')) return;

  const name = Utils.camelCase(basename(file, '.js'));
  /* eslint-disable-next-line global-require, import/no-dynamic-require */
  module.exports[name] = require(join(__dirname, file));
});
