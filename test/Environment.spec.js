/* eslint-env jest */

require('full-icu');

const { Environment } = require('../lib/Environment');

describe('Environment', () => {
  it('test', () => {
    const result = [false, true].includes(Environment.test());
    expect(result).toBe(true);
  });
});
