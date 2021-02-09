/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const { Locale } = require('../lib/Locale');
const { Environment } = require('../lib/Environment');
const { Calendar } = require('../lib/Calendar');

const TEST_ENV = Environment.test();

if (!TEST_ENV) {
  require('@formatjs/intl-locale/polyfill');
  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/en');
  require('@formatjs/intl-getcanonicallocales');
}

const YEAR_OFFSET = 100;

const START_DATE = new Date();

const FORMAT_TOKENS = [
  'a',
  'c',
  'ccc',
  'cccc',
  'ccccc',
  'd',
  'D',
  'dd',
  'DD',
  'DDD',
  'DDDD',
  'E',
  'EEE',
  'EEEE',
  'EEEEE',
  'f',
  'F',
  'ff',
  'FF',
  'fff',
  'FFF',
  'ffff',
  'FFFF',
  'G',
  'GG',
  'GGGGG',
  'h',
  'H',
  'hh',
  'HH',
  'kk',
  'kkkk',
  'L',
  'LL',
  'LLL',
  'LLLL',
  'LLLLL',
  'm',
  'M',
  'mm',
  'MM',
  'MMM',
  'MMMM',
  'MMMMM',
  'o',
  'ooo',
  'q',
  'qq',
  'S',
  's',
  'ss',
  'SSS',
  't',
  'T',
  'tt',
  'TT',
  'ttt',
  'TTT',
  'tttt',
  'TTTT',
  'u',
  'W',
  'WW',
  'X',
  'x',
  'y',
  'yy',
  'yyyy',
  'Z',
  'z',
  'ZZ',
  'ZZZ',
  'ZZZZ',
  'ZZZZZ',
];

// eslint-disable-next-line no-new, no-undef
new Vue({
  el: '#app',
  data: {
    locale: new Locale('en-US'),
    supportable: TEST_ENV,
    formats: [],
    lang: '',
    country: '',
    calendar: '',
    year: 0,
    month: START_DATE,
    heads: [],
    weeks: [],
    years: [],
    monthList: [],
  },
  mounted() {
    this.date = START_DATE;

    this.locale = new Locale('en-US');
    this.lang = this.locale.getLanguageCode();
    this.country = this.locale.getCountryCode();
    this.calendar = this.locale.getCalendar();

    this.calendarObject = new Calendar(this.date, this.locale);
    this.heads = this.calendarObject.dayWeekMonthTable().heads;
    this.weeks = this.calendarObject.dayWeekMonthTable().weeks;
    this.years = this.calendarObject.yearList(YEAR_OFFSET);
    this.year = this.years.find((y) => y.selected).id;
    this.monthList = this.calendarObject.monthList();
    this.month = this.monthList.find((m) => m.selected).id;

    this.drawCalendar();
  },
  computed: {},
  methods: {
    setInputDate() {
      this.drawCalendar();
    },
    drawCalendar() {
      this.calendarObject = new Calendar(this.date, this.locale);
      this.heads = this.calendarObject.dayWeekMonthTable().heads;
      this.weeks = this.calendarObject.dayWeekMonthTable().weeks;
      this.years = this.calendarObject.yearList(YEAR_OFFSET);
      this.year = this.years.find((y) => y.selected).id;
      this.monthList = this.calendarObject.monthList();
      this.month = this.monthList.find((m) => m.selected).id;
      const formats = [];
      FORMAT_TOKENS.forEach((token) => {
        formats.push({
          token,
          string: this.calendarObject.format(token, this.date),
        });
      });
      this.formats = formats;
    },

    changeLang() {
      this.locale = new Locale(this.lang);
      this.lang = this.locale.getLanguageCode();
      this.country = this.locale.getCountryCode();
      this.calendar = this.locale.getCalendar();

      if (this.locale.isRTL()) {
        // eslint-disable-next-line no-undef
        document.querySelector('html').setAttribute('dir', 'rtl');
      } else {
        // eslint-disable-next-line no-undef
        document.querySelector('html').setAttribute('dir', 'ltr');
      }

      this.drawCalendar();
    },
    changeCountry() {
      this.locale.setCountry(this.country);
      this.drawCalendar();
    },
    changeCalendar() {
      this.locale.setCalendar(this.calendar);
      this.drawCalendar();
    },
    yearChange() {
      this.calendarObject.yearJump(this.year);
      this.date = this.calendarObject.getDate();
      this.drawCalendar();
    },
    monthChange() {
      this.date = this.month;
      this.drawCalendar();
    },
    yearShift(next = true) {
      this.date = this.calendarObject.yearShift(next).getDate();
      this.drawCalendar();
    },
    monthShift(next = true) {
      this.date = this.calendarObject.monthShift(next).getDate();
      this.drawCalendar();
    },
    dayShift(next = true) {
      this.date = this.calendarObject.dayShift(next).getDate();
      this.drawCalendar();
    },
  },
});
