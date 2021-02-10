/**
 * @typedef {{id: Number, selected: Boolean, title: String}} YearListItem
 * @typedef {{id: Date, selected: Boolean, title: String, titleNumber: String, titleInt: Number}} MonthListItem
 * @typedef {{id: Date, utcDay: Date, localeDateTime: String, weekDay: Number, weekEnd: Boolean, selected: Boolean, title: String, titleInt: Number}} DayMonthItem
 * @typedef {{id: Date, utcDay: Date, localeDateTime: String, weekDay: Number, weekEnd: Boolean, selected: Boolean, title: String, titleInt: Number, weekNumber: Number}} DayItem
 * @typedef {{long: String, narrow: String}} WeekHead
 * @typedef {[WeekHead, WeekHead, WeekHead, WeekHead, WeekHead, WeekHead, WeekHead]} WeekHeads
 * @typedef {Boolean|DayItem} WeekDay
 * @typedef {[WeekDay, WeekDay, WeekDay, WeekDay, WeekDay, WeekDay, WeekDay]} WeekDays
 * @typedef {{head: WeekHeads, weeks: WeekDays[]}} DayWeekMonthItem
 */
const luxon = require('luxon');

const { Locale } = require('./Locale');

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

class Calendar {
  /**
   * @param {Date} date
   * @param {import('./Locale').Locale} locale
   */
  constructor(date = new Date(), locale = new Locale('en')) {
    this.setLocale(locale);
    this.setDate(date);
  }

  /**
   * @returns {import('./Locale').Locale}
   */
  getLocale() {
    return this.locale;
  }

  /**
   * @param {import('./Locale').Locale} locale
   * @returns {Calendar}
   */
  setLocale(locale) {
    this.locale = locale;
    return this;
  }

  /**
   * @returns {Date}
   */
  getDate() {
    return this.date;
  }

  /**
   * @param {Date} date
   * @returns {Calendar}
   */
  setDate(date) {
    this.date = date;
    return this;
  }

  /**
   * @param {String} format
   * @param {Date} date
   * @return {String}
   */
  format(format, date = this.date) {
    return luxon.DateTime.fromJSDate(date)
      .reconfigure({
        locale: this.locale.toString(),
        outputCalendar: this.locale.getCalendar(),
      })
      .toFormat(format);
  }

  /**
   * @param {String[]} tokens
   * @param {Date} date
   * @returns {Number[]}
   */
  tokenize(tokens, date = this.date) {
    return luxon.DateTime.fromJSDate(date)
      .reconfigure({
        outputCalendar: this.locale.getCalendar(),
        locale: 'en-US',
        numberingSystem: 'latn',
      })
      .toFormat(tokens.join(' '))
      .split(' ')
      .map((p) => parseInt(p, 10));
  }

  /**
   * @param {Number} length
   * @returns {YearListItem[]}
   */
  yearList(length = 10) {
    const [currentYear] = this.tokenize(['yyyy'], this.date);
    const result = [];
    for (let i = -length; i <= length; i += 1) {
      const id = currentYear + i;
      if (id >= 0) {
        result.push({
          id,
          selected: id === currentYear,
          title: this.locale.numberFormat(id),
        });
      }
    }
    return result;
  }

  /**
   * @param {Number} dayOffset
   * @param {Number} wantedYear
   * @param {Number} currentMonth
   * @param {Number} currentDay
   * @returns {Date|null}
   */
  yearOffsetSeek(dayOffset, wantedYear, currentMonth, currentDay) {
    const dt = luxon.DateTime.fromJSDate(this.date).plus({ day: dayOffset });
    const [iterateYear, iterateMonth, iterateDay] = this.tokenize(
      ['yyyy', 'M', 'd'],
      dt.toJSDate(),
    );
    if (
      iterateYear === wantedYear &&
      iterateMonth === currentMonth &&
      iterateDay === currentDay
    ) {
      return dt.toJSDate();
    }
    return null;
  }

  /**
   * @param {Number} wantedYear
   * @returns {Calendar}
   */
  yearJump(wantedYear) {
    const [currentYear, currentMonth, currentDay] = this.tokenize(
      ['yyyy', 'M', 'd'],
      this.date,
    );

    if (wantedYear === currentYear) {
      return this.date;
    }

    const offset = Math.abs(currentYear - wantedYear) * 373;

    if (wantedYear > currentYear) {
      for (let i = 0; i <= offset; i += 1) {
        const date = this.yearOffsetSeek(
          i,
          wantedYear,
          currentMonth,
          currentDay,
        );
        if (date) {
          return this.setDate(date);
        }
      }
    } else {
      for (let i = offset; i >= 0; i -= 1) {
        const date = this.yearOffsetSeek(
          -i,
          wantedYear,
          currentMonth,
          currentDay,
        );
        if (date) {
          return this.setDate(date);
        }
      }
    }

    return this;
  }

  /**
   * @param {Boolean} next
   * @return {Locale}
   */
  yearShift(next = true) {
    const [currentYear] = this.tokenize(['yyyy'], this.date);
    return this.yearJump(next ? currentYear + 1 : currentYear - 1);
  }

  /**
   * @returns {MonthListItem[]}
   */
  monthList() {
    const [currentYear, currentMonth, currentDay] = this.tokenize(
      ['yyyy', 'M', 'd'],
      this.date,
    );
    const result = [];
    for (let i = -397; i <= 397; i += 1) {
      const dt = luxon.DateTime.fromJSDate(this.date).plus({ day: i });
      const [iterateYear, , iterateDay] = this.tokenize(
        ['yyyy', 'M', 'd'],
        dt.toJSDate(),
      );
      if (iterateYear === currentYear && currentDay === iterateDay) {
        const [titleInt] = this.tokenize(['M'], dt.toJSDate());

        const date = dt.toJSDate();

        result.push({
          id: date,
          selected: titleInt === currentMonth,
          title: this.format('MMMM', dt.toJSDate()),
          titleNumber: this.format('M', dt.toJSDate()),
          titleInt,
        });
      }
    }
    return result;
  }

  /**
   * @param {Boolean} next
   * @return {Calendar}
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  monthShift(next = true) {
    const [currentYear, currentMonth, currentDay] = this.tokenize(
      ['yyyy', 'M', 'd'],
      this.date,
    );
    for (let i = -38; i <= 38; i += 1) {
      const dt = luxon.DateTime.fromJSDate(this.date).plus({ day: i });
      const date = dt.toJSDate();
      const [iterateYear, iterateMonth, iterateDay] = this.tokenize(
        ['yyyy', 'M', 'd'],
        date,
      );
      if (iterateDay !== currentDay) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (next) {
        if (iterateYear > currentYear) {
          return this.setDate(date);
        }
        if (iterateMonth > currentMonth) {
          return this.setDate(date);
        }
      } else {
        if (iterateYear < currentYear) {
          return this.setDate(date);
        }
        if (iterateMonth < currentMonth) {
          return this.setDate(date);
        }
      }
    }
    return this;
  }

  /**
   * @param {Boolean} next
   * @return {Calendar}
   */
  dayShift(next = true) {
    const dt = luxon.DateTime.fromJSDate(this.date).plus({
      day: next ? 1 : -1,
    });
    return this.setDate(dt.toJSDate());
  }

  /**
   * @returns {DayMonthItem[]}
   */
  dayMonthList() {
    const [currentYear, currentMonth, currentDay] = this.tokenize(
      ['yyyy', 'M', 'd'],
      this.date,
    );
    const result = [];
    for (let i = -38; i <= 38; i += 1) {
      const dt = luxon.DateTime.fromJSDate(this.date).plus({ day: i });
      const [iterateYear, iterateMonth, iterateDay] = this.tokenize(
        ['yyyy', 'M', 'd'],
        dt.toJSDate(),
      );
      if (iterateYear === currentYear && currentMonth === iterateMonth) {
        const [titleInt] = this.tokenize(['d'], dt.toJSDate());

        const date = dt.toJSDate();

        const utcDay = new Date(date.getTime());
        utcDay.setUTCHours(12, 0, 0, 0);

        const localeDate = [
          iterateYear,
          iterateMonth.toString().padStart(2, '0'),
          iterateDay.toString().padStart(2, '0'),
        ].join('-');
        const localeTime = [
          date.getHours().toString().padStart(2, '0'),
          date.getMinutes().toString().padStart(2, '0'),
          date.getSeconds().toString().padStart(2, '0'),
        ].join(':');

        result.push({
          id: date,
          utcDay,
          localeDateTime: `${localeDate} ${localeTime}`,
          weekDay: date.getDay(),
          weekEnd: this.locale.getWeekEnds().includes(date.getDay()),
          selected: titleInt === currentDay,
          title: this.format('d', dt.toJSDate()),
          titleInt,
        });
      }
    }
    return result;
  }

  /**
   * @returns {DayWeekMonthItem}
   */
  dayWeekMonthTable() {
    const dayList = this.dayMonthList();
    const days = [];
    const weekDays = this.locale.getWeekDays();
    const [weekStartDay] = weekDays;
    const weekNames = {};
    let weekNumber = 0;
    dayList.forEach((day) => {
      if (!weekNames[day.weekDay]) {
        weekNames[day.weekDay] = {
          long: this.format('EEE', day.id),
          narrow: this.format('EEEEE', day.id),
        };
      }

      if (day.weekDay === weekStartDay) {
        weekNumber += 1;
      }

      days.push({
        id: day.id,
        utcDay: day.utcDay,
        localeDateTime: day.localeDateTime,
        weekDay: day.weekDay,
        weekEnd: day.weekEnd,
        selected: day.selected,
        title: day.title,
        titleInt: day.titleInt,
        weekNumber,
      });
    });

    const result = {
      heads: [],
      weeks: [],
    };

    weekDays.forEach((n) => {
      result.heads.push(weekNames[n]);
    });

    const weeksDayList = groupBy(days, 'weekNumber');

    Object.values(weeksDayList).forEach((weeks) => {
      const week = [false, false, false, false, false, false, false];
      weeks.forEach((day) => {
        const weekDayIndex = weekDays.indexOf(day.id.getDay());
        week.splice(weekDayIndex, 1, {
          id: day.id,
          utcDay: day.utcDay,
          localeDateTime: day.localeDateTime,
          weekDay: day.weekDay,
          weekEnd: day.weekEnd,
          selected: day.selected,
          title: day.title,
          titleInt: day.titleInt,
          weekNumber,
        });
      });
      result.weeks.push(week);
    });

    return result;
  }
}

module.exports = { Calendar };
