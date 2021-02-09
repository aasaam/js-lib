/* eslint-env jest */

require('full-icu');

const { Locale } = require('../lib/Locale');
const { Calendar } = require('../lib/Calendar');

const { log } = console;

describe('Calendar', () => {
  it('Should methods works defaults', () => {
    const c = new Calendar();
    expect(c.getDate().getUTCFullYear()).toBe(new Date().getUTCFullYear());
  });
  it('Should methods works current time', () => {
    const l = new Locale('fa');
    l.setCalendar('persian');
    const d = new Date();
    const c = new Calendar(d, l);

    log(JSON.stringify(c.dayMonthList()));
    log(JSON.stringify(c.dayWeekMonthTable()));
  });
  it('Should methods works', () => {
    const l = new Locale('fa');
    const d = new Date(2020, 1, 1);
    const c = new Calendar(d, l);
    const co = new Calendar(d, l);
    c.setLocale(l);
    expect(c.format('yyyy')).toBe('۱۳۹۸');
    expect(c.getDate().getTime()).toBe(d.getTime());

    c.yearShift();
    for (let y = 0; y <= 10; y += 1) {
      c.yearShift(true);
      co.yearShift(false);
    }

    c.monthShift();
    for (let m = 0; m <= 36; m += 1) {
      c.monthShift(true);
      co.monthShift(false);
    }

    c.dayShift();
    for (let ds = 0; ds <= 365; ds += 1) {
      c.dayShift(true);
      co.dayShift(false);
    }

    expect(l.relativeTimeString(d)).toBeTruthy();
    expect(l.relativeTimeString(new Date(), d)).toBeTruthy();

    const t1 = c.getDate().getTime();
    expect(c.dayMonthList().length >= 28).toBe(true);
    expect(l.toString()).toBe(c.getLocale().toString());

    expect(c.getLocale()).toBeTruthy();
    expect(c.yearList().length >= 1).toBe(true);
    const yearList = c.yearList(5);
    const [currentYear] = c.tokenize(['yyyy']);
    c.yearJump(currentYear);

    expect(yearList.length >= 5).toBe(true);
    c.yearJump(yearList[2].id);
    expect(Math.abs(c.getDate().getTime() - t1) >= 63072000000).toBe(true);
    c.yearJump(currentYear + 10);
    expect(c.monthList().length === 12).toBe(true);
  });
  it('Should methods works', () => {
    const l = new Locale('en');
    l.setCalendar('roc');
    const d = new Date(1900, 1, 1);
    const c = new Calendar(d, l);
    expect(c.yearList(100)).toBeTruthy();
  });
});
