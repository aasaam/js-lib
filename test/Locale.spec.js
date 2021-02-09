/* eslint-env jest */

require('full-icu');

const languages = require('../lib/languages');
const countries = require('../lib/countries');
const { Locale } = require('../lib/Locale');

describe('Locale', () => {
  it('Should methods works in fa', () => {
    const l = new Locale('fa');

    expect(l.getCountryList()).toBeTruthy();
    expect(l.getLanguageList()).toBeTruthy();
    expect(l.getCalendarList()).toBeTruthy();

    expect(l.isRTL()).toBe(true);
    expect(l.getCalendar()).toBe('persian');
    expect(l.getCountryCode()).toBe('IR');
    expect(l.getCountryFlag()).toBe('🇮🇷');
    expect(l.getNumberingSystem()).toBe('arabext');
  });
  it('Should methods works', () => {
    const l = new Locale('fa-ZZ');
    expect(l.getNumberingSystem()).toBe('arabext');
    expect(l.isRTL()).toBe(true);
    expect(l.getCalendar()).toBe('persian');
    expect(l.getCountryCode()).toBe('IR');
    expect(l.getCountryFlag()).toBe('🇮🇷');

    // change to unknown country
    l.setCountry('ZZ');
    expect(l.getCalendar()).not.toBe('persian');
    expect(l.getCountryCode()).not.toBe('IR');
    expect(l.getCountryFlag()).not.toBe('🇮🇷');
  });
  it('Should be supported all matrix', () => {
    languages.forEach((lang) => {
      const l = new Locale(lang);
      expect(l.getLanguageCode()).toBe(lang);
      expect(l.getCountryCode()).toBeTruthy();
      Object.keys(countries).keys((code) => {
        const lc = new Locale(`${lang}-${code}`);
        expect(lc.getLanguageCode()).toBe(lang);
        expect(lc.getCountryCode()).toBe(code);
      });
    });
  });
  it('Should be supported all languages', () => {
    languages.forEach((lang) => {
      const l = new Locale(lang);
      expect(l.getLanguageCode()).toBe(lang);
    });
  });
});
