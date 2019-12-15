/*
 * @Description: API配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-09 22:23:09
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-11 16:11:00
 */

import { NODE_ENV } from './env.config';

const apiMap = {
  development: {
    PREFIX: '/api',
    BASE_URL: 'http://localhost:3030'
  },
  production: {
    PREFIX: '/api',
    BASE_URL: 'https://api.ikmoons.com'
  }
}

export default apiMap[NODE_ENV];
