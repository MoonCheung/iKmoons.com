/*
 * @Description: ua 解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-28 22:36:28
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-24 22:27:08
 */

import parser from 'ua-parser-js';

export const usParser = param => {
  const parseResult = parser(param || '');
  const browserName = parseResult.browser.name.toLowerCase();
  const isBrowser = browsers => {
    return browsers.some(
      browser => browser.toLowerCase() === browserName
    )
  }
  return {
    result: parseResult,
    isIE: isBrowser(['compatible', 'MSIE', 'IE']),
    isEdge: isBrowser(['Edge']),
    isFirefox: isBrowser(['Firefox']),
    isChrome: isBrowser(['Chrome', 'Chromium']),
    isSafari: isBrowser(['Safari']),
    isWechat: isBrowser(['Wechat']),
    isUCBrowser: isBrowser(['UCBrowser']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile'
  }
}
