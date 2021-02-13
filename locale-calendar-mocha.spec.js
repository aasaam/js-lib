/* eslint-env jest */

const { expect } = require('chai');

const { Environment } = require('../lib/Environment');
const { Locale } = require('../lib/Locale');
const { Calendar } = require('../lib/Calendar');

const { log } = console;

describe('Environment', () => {
  it('Environment.test()', () => {
    const result = Environment.test();
    expect(result).eq(true);
  });
});

describe('Locale', () => {
  it(`Locale Test`, () => {
    const l = new Locale('fa');
    expect(l.getCountryCode()).eq('IR');
    expect(l.getLanguageCode()).eq('fa');
    expect(l.getCountryList().length).to.be.gt(1);
    expect(l.getLanguageList().length).to.be.gt(1);
    log(l.toString());
    log(l.getNumberingSystem());
    log(l.getCalendarList());
    log(l.getLanguageList());
  });
});

describe('Calendar', () => {
  it(`Calendar with fa`, () => {
    const d = new Date(2021, 2, 7);
    const l = new Locale('fa');
    const c = new Calendar(d, l);
    expect(c.getLocale().toString()).eq(l.toString());

    log(c.getDate());
    log(c.yearJump(1398));
    log(c.getDate());
  });
});
