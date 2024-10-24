import crypto from 'crypto';
import { existsSync, readFileSync, statSync, writeFile } from 'fs';
import { mkdirp } from 'mkdirp';
import { extname, join, dirname } from 'path';

import sharp from 'sharp';

import { Utils } from '../../../utils/index.js';

const ACCEPTED_FORMATS = {
  '.jpg': 1,
  '.jpeg': 1,
  '.png': 1,
  '.webp': 1,
};

/**
 * Resize and crop images
 *
 * @params {Object} paths
 * @return {function}
 */
export function imageProcessingMiddleware(paths) {
  return async (ctx, next) => {
    const ext = extname(ctx.path).toLowerCase();
    const { w, h } = ctx.query;

    if (!ACCEPTED_FORMATS[ext] || !(w || h)) return next();

    const filePath = ctx.path.startsWith('/uploads')
      ? join(paths.data, ctx.path)
      : join(paths.www, ctx.path);
    const fileStats = statSync(filePath);
    const cacheKey = crypto
      .createHash('md5')
      .update(`${ctx.url}${fileStats.mtime}`)
      .digest('hex');
    const cachePath = join(paths.cache, `${cacheKey}${ext}`);
    const cacheExists = existsSync(cachePath);

    ctx.set('Content-Length', fileStats.size);
    ctx.type = ext;

    ctx.body = await (async () => {
      if (cacheExists) {
        return readFileSync(cachePath);
      }

      // make sure cache directory exists
      mkdirp.sync(dirname(cachePath));

      const buffer = await sharp(filePath)
        .rotate()
        .resize({
          width: Number(w) || null,
          height: Number(h) || null,
        })
        .toBuffer();

      writeFile(cachePath, buffer, Utils.noop);
      return buffer;
    })();

    return true;
  };
}
