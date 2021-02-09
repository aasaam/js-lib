/**
 * @typedef {'buddhist'|'coptic'|'ethioaa'|'ethiopic'|'gregory'|'hebrew'|'indian'|'islamic'|'islamicc'|'japanese'|'persian'|'roc'} CalendarSystem
 * @typedef {'arab'|'arabext'|'bali'|'beng'|'deva'|'fullwide'|'gujr'|'guru'|'hanidec'|'khmr'|'knda'|'laoo'|'latn'|'limb'|'mlym'|'mong'|'mymr'|'orya'|'tamldec'|'telu'|'thai'|'tibt'} NumericSystemType
 * @typedef {'AC'|'AD'|'AE'|'AF'|'AG'|'AI'|'AL'|'AM'|'AO'|'AR'|'AS'|'AT'|'AU'|'AW'|'AX'|'AZ'|'BA'|'BB'|'BD'|'BE'|'BF'|'BG'|'BH'|'BI'|'BJ'|'BL'|'BM'|'BN'|'BO'|'BQ'|'BR'|'BS'|'BT'|'BW'|'BY'|'BZ'|'CA'|'CC'|'CD'|'CF'|'CG'|'CH'|'CI'|'CK'|'CL'|'CM'|'CN'|'CO'|'CR'|'CU'|'CV'|'CW'|'CX'|'CY'|'CZ'|'DE'|'DG'|'DJ'|'DK'|'DM'|'DO'|'DZ'|'EA'|'EC'|'EE'|'EG'|'EH'|'ER'|'ES'|'ET'|'FI'|'FJ'|'FK'|'FM'|'FO'|'FR'|'GA'|'GB'|'GD'|'GE'|'GF'|'GG'|'GH'|'GI'|'GL'|'GM'|'GN'|'GP'|'GQ'|'GR'|'GT'|'GU'|'GW'|'GY'|'HK'|'HN'|'HR'|'HT'|'HU'|'IC'|'ID'|'IE'|'IL'|'IM'|'IN'|'IO'|'IQ'|'IR'|'IS'|'IT'|'JE'|'JM'|'JO'|'JP'|'KE'|'KG'|'KH'|'KI'|'KM'|'KN'|'KP'|'KR'|'KW'|'KY'|'KZ'|'LA'|'LB'|'LC'|'LI'|'LK'|'LR'|'LS'|'LT'|'LU'|'LV'|'LY'|'MA'|'MC'|'MD'|'ME'|'MF'|'MG'|'MH'|'MK'|'ML'|'MM'|'MN'|'MO'|'MP'|'MQ'|'MR'|'MS'|'MT'|'MU'|'MV'|'MW'|'MX'|'MY'|'MZ'|'NA'|'NC'|'NE'|'NF'|'NG'|'NI'|'NL'|'NO'|'NP'|'NR'|'NU'|'NZ'|'OM'|'PA'|'PE'|'PF'|'PG'|'PH'|'PK'|'PL'|'PM'|'PN'|'PR'|'PS'|'PT'|'PW'|'PY'|'QA'|'RE'|'RO'|'RS'|'RU'|'RW'|'SA'|'SB'|'SC'|'SD'|'SE'|'SG'|'SH'|'SI'|'SJ'|'SK'|'SL'|'SM'|'SN'|'SO'|'SR'|'SS'|'ST'|'SV'|'SX'|'SY'|'SZ'|'TA'|'TC'|'TD'|'TF'|'TG'|'TH'|'TJ'|'TK'|'TL'|'TM'|'TN'|'TO'|'TR'|'TT'|'TV'|'TW'|'TZ'|'UA'|'UG'|'UM'|'US'|'UY'|'UZ'|'VA'|'VC'|'VE'|'VG'|'VI'|'VN'|'VU'|'WF'|'WS'|'XK'|'YE'|'YT'|'ZA'|'ZM'|'ZW'} CountryISOCode
 * @typedef {'aa'|'af'|'ar'|'az'|'be'|'bg'|'bi'|'bm'|'bn'|'bs'|'ca'|'cs'|'da'|'de'|'dv'|'dz'|'el'|'en'|'es'|'et'|'fa'|'fi'|'fo'|'fr'|'gn'|'ha'|'he'|'hi'|'hr'|'ht'|'hu'|'hy'|'id'|'is'|'it'|'ja'|'ka'|'kl'|'km'|'ko'|'ky'|'lo'|'lt'|'lv'|'mg'|'mk'|'mn'|'ms'|'mt'|'my'|'nb'|'ne'|'nl'|'pl'|'pt'|'rn'|'ro'|'ru'|'rw'|'si'|'sk'|'sl'|'sm'|'sn'|'so'|'sq'|'sr'|'st'|'sv'|'sw'|'tg'|'th'|'ti'|'tk'|'to'|'tr'|'ur'|'uz'|'vi'|'wo'|'zh'} LanguageISOCode
 */

const luxon = require('luxon');

const countries = require('./countries');
const languages = require('./languages');

/** @type {CalendarSystem[]} */
const SUPPORTED_CALENDARS = [
  'gregory',
  'persian',
  'islamicc',
  'islamic',
  'buddhist',
  'coptic',
  'ethioaa',
  'ethiopic',
  'hebrew',
  'indian',
  'japanese',
  'roc',
];

class Locale {
  /**
   * @param {String} formatted
   * @param {String} ident
   * @returns {String}
   */
  static calendarName(formatted, ident) {
    const camelCase = ident.charAt(0).toUpperCase() + ident.slice(1);
    if (formatted.match(/^ERA/) || formatted === 'null') {
      return camelCase;
    }
    if (ident === 'islamicc') {
      return `${formatted}(c)`;
    }
    return formatted;
  }

  /**
   * @param {String} locale
   */
  constructor(locale) {
    const iLocale = new Intl.Locale(Intl.getCanonicalLocales(locale));
    const country = iLocale.maximize().region;
    this.language = iLocale.maximize().language;
    this.setCountry(country);
    this.numberingSystem = new Intl.NumberFormat(
      this.toString(),
    ).resolvedOptions().numberingSystem;
  }

  /**
   * @returns {String}
   */
  toString() {
    return `${this.language}-${this.country}`;
  }

  /**
   * @returns {LanguageISOCode}
   */
  getLanguageCode() {
    return this.language;
  }

  /**
   * @returns {CountryISOCode}
   */
  getCountryCode() {
    return this.country;
  }

  /**
   * @returns {String}
   */
  getCountryFlag() {
    return this.flag;
  }

  /**
   * @returns {Calendar}
   */
  getCalendar() {
    return this.calendar;
  }

  /**
   * @returns {Boolean}
   */
  isRTL(lang = this.language) {
    return ['ar', 'dv', 'fa', 'he', 'ps', 'ur', 'yi'].includes(lang);
  }

  /**
   * @returns {NumericSystem}
   */
  getNumberingSystem() {
    return this.numberingSystem;
  }

  /**
   * @param {Number} number
   * @param {Intl.NumberFormatOptions} options
   * @returns {String}
   */
  numberFormat(
    number,
    options = {
      useGrouping: false,
    },
  ) {
    const formatter = new Intl.NumberFormat(this.toString(), options);
    return formatter.format(number);
  }

  /**
   * @param {Date} date1
   * @param {Date} date2
   * @param {Intl.RelativeTimeFormatOptions} options
   * @returns {String}
   */
  relativeTimeString(
    date1,
    date2 = new Date(),
    options = {
      style: 'narrow',
    },
  ) {
    const formatter = new Intl.RelativeTimeFormat(this.language, options);
    const diff = date1 - date2;
    const diffAbs = Math.abs(diff);
    const x = diff > 0 ? 1 : -1;

    const matrix = {
      year: 31536000000,
      month: 2592000000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000,
    };

    let output = '';

    Object.keys(matrix).forEach((unit) => {
      const interval = matrix[unit];
      if (output === '' && diffAbs > interval) {
        output = formatter.format(x * Math.round(diffAbs / interval), unit);
      }
    });

    return output;
  }

  /**
   * @param {CountryISOCode} country
   * @returns {Locale}
   */
  setCountry(country) {
    this.weekdays = [1, 2, 3, 4, 5, 6, 0];
    this.weekends = [6, 0];
    this.flag = '🇿🇿';
    this.calendar = 'gregory';

    if (countries[country]) {
      this.flag = countries[country].f;

      if (countries[country].wd) {
        this.weekdays = countries[country].wd;
      }

      if (countries[country].we) {
        this.weekends = countries[country].we;
      }

      if (countries[country].c) {
        this.calendar = countries[country].c;
      }
    }

    this.country = country;

    return this;
  }

  /**
   * @param {CalendarSystem} calendar
   * @returns {Locale}
   */
  setCalendar(calendar) {
    this.calendar = calendar;
    return this;
  }

  /**
   * @returns {Number[]}
   */
  getWeekDays() {
    return this.weekdays;
  }

  /**
   * @returns {Number[]}
   */
  getWeekEnds() {
    return this.weekends;
  }

  /**
   * @return {{ id: CountryISOCode, selected: Boolean, defaultLanguage: LanguageISOCode, flag: String, title: String, titleNative: String }[]}
   */
  getCountryList() {
    const result = [];
    Object.keys(countries).forEach((code) => {
      const data = countries[code];
      const title = new Intl.DisplayNames([this.language], {
        type: 'region',
      });
      const titleNative = new Intl.DisplayNames([data.l], { type: 'region' });

      result.push({
        id: code,
        selected: this.country === code,
        defaultLanguage: code.l,
        flag: data.f,
        title: title.of(code),
        titleNative: titleNative.of(code),
      });
    });
    return result;
  }

  /**
   * @return {{id: LanguageISOCode, selected: Boolean, rtl: Boolean, title: String, titleNative: String}[]}
   */
  getLanguageList() {
    const result = [];
    languages.forEach((code) => {
      const title = new Intl.DisplayNames([this.language], {
        type: 'language',
      });
      const titleNative = new Intl.DisplayNames([code], { type: 'language' });

      result.push({
        id: code,
        selected: this.language === code,
        rtl: this.isRTL(code),
        title: title.of(code),
        titleNative: titleNative.of(code),
      });
    });
    return result;
  }

  /**
   * @return {{id: Calendar, selected: Boolean, long: String, short: String}[]}
   */
  getCalendarList() {
    return SUPPORTED_CALENDARS.map((ident) => {
      const d = luxon.DateTime.local().reconfigure({
        locale: this.language,
        outputCalendar: ident,
      });
      return {
        id: ident,
        selected: this.calendar === ident,
        title: this.constructor.calendarName(d.toFormat('GG'), ident),
        titleShort: this.constructor.calendarName(d.toFormat('G'), ident),
      };
    });
  }
}

module.exports = { Locale, SUPPORTED_CALENDARS };
