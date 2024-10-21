import CSRF from 'koa-csrf';

/**
 * CSRF
 *
 * @return {function}
 */

export function csrfMiddleware() {
  return new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false,
  });
}
