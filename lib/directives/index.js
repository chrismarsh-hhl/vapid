import { globSync } from 'glob';
import { resolve, dirname } from 'path';
import { Utils, Logger, __dirname } from '../utils/index.js';

import BaseDirective from './base.js';

// TODO: Allow custom directives in site folder?
const directivesDir = dirname(resolve(__dirname, '../directives/index.js'));
const vapidDirectives = globSync(`${directivesDir}/!(base|index).js`);
const availableDirectives = {};

// Populate available directives
vapidDirectives.forEach(async (file) => {
  const klassFunction = await import(file);
  const klass = klassFunction.default(BaseDirective);
  const name = Utils.kebabCase(klass.name).split('-')[0];

  availableDirectives[name] = klass;
});

/**
 * Lookup function for available directives. Return a new instance if found.
 * Falls back to "text" directive if one can't be found.
 *
 * @params {Object} params - options and attributes
 * @return {Directive} - an directive instance
 */
function find(params = {}) {
  // If no name is given, silently fall back to text.
  const name = params.type === undefined ? 'text' : params.type;

  if (availableDirectives[name]) {
    return new availableDirectives[name](params);
  }

  // Only show warning if someone explicity enters a bad name
  if (name) {
    Logger.warn(
      `Directive type '${name}' does not exist. Falling back to 'text'`,
    );
  }

  /* eslint-disable-next-line new-cap */
  return new availableDirectives.text(params);
}

export default {
  find,
};
