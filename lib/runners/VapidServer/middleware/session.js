import sess from 'koa-session';
import convert from 'koa-convert';

const key = 'vapid:sess';

/**
 * Initializes the session
 *
 * @param {Object} app
 * @return {function}
 */
export function sessionMiddleware(app) {
  return convert(sess(app, { key }));
}
