/* eslint-env jest */

require('full-icu');

const { Environment } = require('../lib/Environment');

describe('Environment', () => {
  it('test', () => {
    expect(Environment.test()).toBe(true);
  });
});
