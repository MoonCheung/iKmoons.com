/*
 * @Description: 常用工具
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-15 23:39:08
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-24 23:29:58
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
