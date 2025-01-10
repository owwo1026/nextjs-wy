import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export enum DATE_FORMAT {
  DAYJS = 'YYYY-MM-DDTHH:mm:ss.SSS',
  DAYJS_SLASH_AM_PM = 'YYYY/MM/DD HH:mm:ssA',
  DAYJS_SLASH = 'YYYY/MM/DD',
  DAYJS_DASH = 'YYYY-MM-DD',
  DAYJS_CN = 'YYYY年MM月DD日',
  DAYJS_CN_HM = 'YYYY年MM月DD日 HH:mm',
  DAYJS_TIME_SLASH = 'YYYY/MM/DD HH:mm',
  DAYJS_NO_SEPARATOR = 'YYYYMMDD',
  DATE = 'yyyy-MM-ddTHH:mm:ss.SSS',
  DATE_SLASH = 'yyyy/MM/dd',
  DATE_DASH = 'yyyy-MM-dd',
  DATE_CN = 'yyyy年MM月dd日',
  TIME = 'HH:mm',
  TIME_HMS = 'HH:mm:ss',
}

export function formatDate(date?: Date, format: string = DATE_FORMAT.DAYJS_SLASH): string {
  if (!date) return '';
  const taiwanTime = dayjs(date).utcOffset('+08:00');
  return taiwanTime.format(format);
}

export const concatDateAndTime = (date: string, time: string): Date => {
  return new Date(`${extractDate(date)}T${extractTime(time)}`);
};

export const extractDate = (dateTime: string): string => {
  const datePattern = /^\d{4}-\d{2}-\d{2}/;
  const match = dateTime.match(datePattern);
  if (match) {
    return match[0];
  } else {
    console.log('extractDate error');
    return '';
  }
};

export const extractTime = (dateTime: string): string => {
  // 使用正則表達式驗證是否符合 HH:mm:ss 格式
  const timePattern = /(\d{2}:\d{2}:\d{2})/;
  const match = dateTime.match(timePattern);
  if (match) {
    // 如果匹配，回傳時間部分
    return match[0];
  } else {
    // 如果不匹配，回傳錯誤訊息或其他預設值
    console.log('extractTime error');
    return '';
  }
};

export const addHoursToDate = (date: string, hoursToAdd: number): Date => {
  const updatedTime = dayjs.utc(date).add(hoursToAdd, 'hour').utcOffset(8);
  return updatedTime.toDate();
};

export const addMinutesToDate = (date: string, minutes: number): Date => {
  const updatedTime = dayjs.utc(date).add(minutes, 'minute').utcOffset(8);
  return updatedTime.toDate();
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * 將日期轉換為中文格式字串
 * @param dateData
 */
export const convertDate2StringDateCN = (dateData: Date | string | number): string => {
  // 檢查傳入的日期是否無效
  if (isNaN(new Date(dateData).getTime())) {
    return '';
  }

  const date = new Date(dateData);
  const yyyy = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');

  return `${yyyy}年${MM}月${dd}日`;
};

/**
 * 將日期字串轉換為民國格式
 * @param dateStr
 */
export const convertDate2Minguo = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return dateStr;
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const minguoYear = (year - 1911).toString().padStart(3, '0');

  return `${minguoYear}-${month}-${day}`;
};
