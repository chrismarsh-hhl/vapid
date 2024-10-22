import BaseDirective from '../../lib/directives/base.js';
import TextDirectiveFunction from '../../lib/directives/text';

const TextDirective = TextDirectiveFunction(BaseDirective);

describe('#input', () => {
  test('renders long=true as a textarea', () => {
    const directive = new TextDirective({ long: true });
    expect(directive.input('test')).toMatch(/textarea/);
  });

  test('sets the maxlength attribute', () => {
    const directive = new TextDirective({ maxlength: 115 });
    expect(directive.input('test')).toMatch(/maxlength="115"/);
  });
});
