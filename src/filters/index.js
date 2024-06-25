// import parseTime, formatTime and set to filter
import { numberToFixed, timeForStr } from '@/utils';
export { parseTime, formatTime } from '@/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

/**
 * 数据 formatting 算力单位
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits = 8) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  if (!num) {
    return num;
  }
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        ' ' +
        si[i].symbol +
        'H/s'
      );
    }
  }
  return num.toString() + ' H/s';
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 数据为空的默认显示
 */
export function defaultEmpty(value) {
  return value || '--';
}

/**
 * 保留小数位数
 * @param {string|Number}} num
 * @param {Number} digit
 */
export function keepDecimal(num, digit = 8) {
  return numberToFixed(num, digit);
}
/**
 * 大小写转化
 * @param {} str
 */
export function toUpperCase(str) {
  return typeof str === 'string' ? str.toUpperCase() : str;
}
/**
 *
 * 格式化日期
 * @export
 * @param {*} val
 * @param {*} str
 * @returns
 */
export function timeFormate(val, str) {
  if (!val) return '--';
  str = str || 'YYYY-MM-DD hh:mm:ss';
  return timeForStr(val, str);
}

/**
 *
 * UTC转换成当前时区
 * @export
 * @param {*} val
 * @param {*} str
 * @returns
 */
export function tzTime(time, str = 'YYYY-MM-DD hh:mm:ss') {
  if (!time) {
    return '--';
  }
  let _time = dayjs
    .utc(time)
    .local()
    .format(str);
  return _time;
}

/**
 *
 * UTC转换成当前时区
 * @export
 * @param {*} val
 * @param {*} str
 * @returns
 */
export function tzTimeFormate(time) {
  if (!time) {
    return { date: '--', time: '--' };
  }
  let _time = {
    date: tzTime(time, 'YYYY.MM.DD'),
    time: tzTime(time, 'hh:mm:ss'),
  };
  return _time;
}
