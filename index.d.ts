type CalendarSystem = 'buddhist' | 'coptic' | 'ethioaa' | 'ethiopic' | 'gregory' | 'hebrew' | 'indian' | 'islamic' | 'islamicc' | 'japanese' | 'persian' | 'roc';
type NumericSystemType = 'arab' | 'arabext' | 'bali' | 'beng' | 'deva' | 'fullwide' | 'gujr' | 'guru' | 'hanidec' | 'khmr' | 'knda' | 'laoo' | 'latn' | 'limb' | 'mlym' | 'mong' | 'mymr' | 'orya' | 'tamldec' | 'telu' | 'thai' | 'tibt';
type CountryISOCode = 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DG' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EA' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HN' | 'HR' | 'HT' | 'HU' | 'IC' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';
type LanguageISOCode = 'aa' | 'af' | 'ar' | 'az' | 'be' | 'bg' | 'bi' | 'bm' | 'bn' | 'bs' | 'ca' | 'cs' | 'da' | 'de' | 'dv' | 'dz' | 'el' | 'en' | 'es' | 'et' | 'fa' | 'fi' | 'fo' | 'fr' | 'gn' | 'ha' | 'he' | 'hi' | 'hr' | 'ht' | 'hu' | 'hy' | 'id' | 'is' | 'it' | 'ja' | 'ka' | 'kl' | 'km' | 'ko' | 'ky' | 'lo' | 'lt' | 'lv' | 'mg' | 'mk' | 'mn' | 'ms' | 'mt' | 'my' | 'nb' | 'ne' | 'nl' | 'pl' | 'pt' | 'rn' | 'ro' | 'ru' | 'rw' | 'si' | 'sk' | 'sl' | 'sm' | 'sn' | 'so' | 'sq' | 'sr' | 'st' | 'sv' | 'sw' | 'tg' | 'th' | 'ti' | 'tk' | 'to' | 'tr' | 'ur' | 'uz' | 'vi' | 'wo' | 'zh';

type YearListItem = {
  id: number,
  selected: boolean,
  title: string,
}

type MonthListItem = {
  id: number,
  selected: boolean,
  title: string,
  titleNumber: string,
  titleInt: string,
}

type DayMonthItem = {
  id: Date,
  utcDay: Date,
  localeDateTime: string,
  weekDay: number,
  weekEnd: boolean,
  selected: boolean,
  title: string,
  titleInt: number
}

type DayItem = {
  id: Date,
  utcDay: Date,
  localeDateTime: string,
  weekDay: number,
  weekEnd: boolean,
  selected: boolean,
  title: string,
  titleInt: number,
  weekNumber: number,
}

type WeekHead = {
  long: string,
  narrow: string,
}

type WeekHeads = [WeekHead, WeekHead, WeekHead, WeekHead, WeekHead, WeekHead, WeekHead]

type WeekDay = boolean | DayItem

type DayWeekMonthItem = {
  head: WeekHeads,
  weeks: WeekDay[],
}

interface RelativeTimeFormatOptions {
  localeMatcher?: string;
  numeric?: string;
  style?: string;
}

export declare class Environment {
  public static test(): boolean;
}

export declare class Calendar {
  constructor(date?: Date, locale?: Locale);

  public getLocale(): Locale

  public setLocale(locale: Locale): Calendar;

  public getDate(): Date;

  public setDate(date: Date): Calendar

  public format(format: string, date?: Date): string;

  public tokenize(tokens: string[], date?: Date): Number[]

  public yearList(length?: number): YearListItem[];

  public yearOffsetSeek(dayOffset: number, wantedYear: number, currentMonth: number, currentDay: number): Date | null;

  public yearJump(wantedYear: number): Calendar;

  public yearShift(next?: boolean): Calendar;

  public monthList(): MonthListItem[];

  public monthShift(next?: boolean): Calendar;

  public dayShift(next?: boolean): Calendar;

  public dayMonthList(): DayMonthItem[];

  public dayWeekMonthTable(): DayWeekMonthItem;
}

export declare class Locale {
  public static calendarName(formatted: string, ident: string): string;

  constructor(locale: string);

  public toString(): string;

  public getLanguageCode(): LanguageISOCode;

  public getCountryCode(): CountryISOCode;

  public getCountryFlag(): string;

  public getCalendar(): CalendarSystem;

  public isRTL(lang?: string): boolean;

  public getNumberingSystem(): NumericSystemType;

  public numberFormat(
    number: number,
    options?: Intl.NumberFormatOptions,
  ): string

  public relativeTimeString(
    date1: Date,
    date2?: Date,
    options?: RelativeTimeFormatOptions,
  ): string

  public setCountry(country: string): Locale;

  public setCalendar(calendar: CalendarSystem): Locale;

  public getWeekDays(): number[];

  public getWeekEnds(): number[];

  public getCountryList(): {
    id: CountryISOCode,
    selected: boolean,
    defaultLanguage: LanguageISOCode,
    flag: string,
    title: string,
    titleNative: string,
  }[];

  public getLanguageList(): {
    id: LanguageISOCode,
    selected: boolean,
    rtl: boolean,
    title: string,
    titleNative: string,
  }[];

  public getCalendarList(): {
    id: CalendarSystem,
    selected: boolean,
    title: string,
    titleShort: string,
  }[];
}

export declare const SUPPORTED_CALENDARS: CalendarSystem[];
