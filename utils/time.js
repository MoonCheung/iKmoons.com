/*
 * @Description: date 解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-15 23:39:08
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-19 17:37:50
 */

/**
 * 格式化日期
 * @param {*} date
 * @param {*} format
 * @returns yyyy-MM-dd hh:mm:ss.S 或者 yyyy年MM月dd日 hh:mm:ss
 */
export function formatDate(date, format) {
  const fmtDate = new Date(date)
  const o = {
    "y+": fmtDate.getFullYear(),
    "M+": fmtDate.getMonth() + 1, // 月份
    "d+": fmtDate.getDate(), // 日
    "h+": fmtDate.getHours(), // 小时
    "m+": fmtDate.getMinutes(), // 分
    "s+": fmtDate.getSeconds(), // 秒
    "q+": Math.floor((fmtDate.getMonth() + 3) / 3), // 季度
    "S+": fmtDate.getMilliseconds() // 毫秒
  };
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      if (k == "y+") {
        format = format.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      } else if (k == "S+") {
        let lens = RegExp.$1.length;
        lens = lens == 1 ? 3 : lens;
        format = format.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
      } else {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return format;
}

/**
 * 毫秒数转换为规定时间格式
 * @param {*} param
 * @returns 得到之前时间
 */
export function DateBefore(date) {
  let result = "";
  // 时间戳精确到毫秒
  const timeStamp = parseInt(new Date(date).getTime() / 1000);
  const curTimeStamp = parseInt(new Date().getTime() / 1000);
  // 时间戳相差
  const diff = curTimeStamp - timeStamp;
  // 1000 * 60 毫秒
  // (1000 * 60) * 60 分钟
  // ((1000 * 60) * 60 ) * 24 小时
  // (((1000 * 60) * 60 ) * 24) * 30 每月
  // ((((1000 * 60) * 60 ) * 24) * 30) * 12 每年
  if (diff > 60 && diff < 3600) {
    result = parseInt(diff / 60) + ' 分钟前'
  } else if (diff >= 3600 && diff < 24 * 3600) {
    result = parseInt(diff / 3600) + ' 小时前'
  } else if (diff >= 24 * 3600 && diff < 30 * (24 * 3600)) {
    result = parseInt(diff / 3600 / 24) + ' 天前'
  } else if (diff >= 30 * (24 * 3600) && diff < 12 * (30 * (24 * 3600))) {
    result = parseInt(diff / 3600 / 24 / 30) + ' 个月前'
  } else if (diff >= 12 * (30 * (24 * 3600))) {
    result = parseInt(diff / 3600 / 24 / 30 / 12) + ' 年前'
  } else if (diff < 60) {
    result = '刚刚发表'
  }
  return result;
}
