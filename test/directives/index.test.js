import directives from '../../lib/directives/index.js';

describe('.find', () => {
  test('fallback to TextDirective', () => {
    const directive = directives.find();
    expect(directive.constructor.name).toEqual('TextDirective');
  });
});
