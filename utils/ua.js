/*
 * @Description: ua 解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-28 22:36:28
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-18 21:05:37
 */

import parser from 'ua-parser-js';

export const usParser = param => {
  const parseResult = parser(param || '');
  // const browserName = parseResult.browser.name;
  // const isBrowser = browsers => {
  //   return browsers.some(
  //     browser => browser === browserName
  //   )
  // }
  return {
    result: parseResult,
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile'
  }
}
