import sess from 'koa-session';
import convert from 'koa-convert';

const key = 'vapid:sess';

/**
 * Initializes the session
 *
 * @param {Object} app
 * @return {function}
 */
const convertFunction = (app) => convert(sess(app, { key }));

export default convertFunction;
