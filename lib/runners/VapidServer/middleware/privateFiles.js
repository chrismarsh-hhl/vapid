import { Paths } from '../../../utils/index.js';

/**
 * Throw 404 if the path starts with an underscore or period
 *
 * @params {Object} ctx
 * @params {function} next
 * @return {function}
 *
 * @throws {Boom.notFound}
 */
export async function privateFilesMiddleware(ctx, next) {
  Paths.assertPublicPath(ctx.path);
  await next();
}
