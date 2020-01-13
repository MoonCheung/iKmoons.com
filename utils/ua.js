/*
 * @Description: ua 解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-28 22:36:28
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-12 20:54:49
 */

import parser from 'ua-parser-js';

export const usParser = param => {
  const parseResult = parser(param || '');
  return {
    result: parseResult
  }
}
