import fs from 'fs';
import tmp from 'tmp';
import { join } from 'path';

import Generator from '../lib/generator.js';
import { Utils } from '../lib/utils/index.js';

let target;

describe('.copyTo', () => {
  beforeAll(() => {
    target = tmp.tmpNameSync();
    Generator.copyTo(target);
  });

  afterAll(() => {
    Utils.removeFiles(target);
  });

  test('generates a secret key', () => {
    const env = fs.readFileSync(join(target, '.env'), 'utf-8');
    expect(env).toMatch(/SECRET_KEY=[a-f0-9]{128}/);
  });

  test('shows an error if the target already exists', () => {
    function copyAgain() {
      Generator.copyTo(target);
    }

    expect(copyAgain).toThrowErrorMatchingSnapshot();
  });
});

describe('.copyEnv', () => {
  test('generates a secret key', () => {
    target = tmp.tmpNameSync();
    Generator.copyEnv(target);

    const env = fs.readFileSync(join(target, '.env'), 'utf-8');
    expect(env).toMatch(/SECRET_KEY=[a-f0-9]{128}/);

    Utils.removeFiles(target);
  });
});
