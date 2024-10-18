// TODO: Remove execSync, and test Commander directly
// Also, test other commands
import { execSync } from 'child_process';
import { join } from 'path';
import { version } from '../package.json';
import { __dirname } from '../lib/utils/index.js';

const bin = join(__dirname, '../bin/cli.js');

function cmd(args = '') {
  return execSync(`${bin} ${args}`, { encoding: 'utf-8' });
}

/**
 * Version
 */
describe('version', () => {
  test('prints the version number', () => {
    expect(cmd('-v')).toEqual(`Vapid ${version}\n`);
    expect(cmd('--version')).toEqual(`Vapid ${version}\n`);
  });
});

/**
 * Help
 */
describe('help', () => {
  test('if called explicitly', () => {
    expect(cmd('-h')).toMatch(/Usage: /);
    expect(cmd('--help')).toMatch(/Usage: /);
  });

  test('if no arguments are passed', () => {
    expect(cmd()).toMatch(/Usage: /);
  });

  test('if a non-existent command is issued', () => {
    expect(cmd('foo')).toMatch(/Usage: /);
  });
});
