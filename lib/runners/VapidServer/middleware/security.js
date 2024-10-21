import helmet from 'koa-helmet';

/**
 * A pass-through for Helmet
 */
export function securityMiddleware() {
  return helmet();
}
