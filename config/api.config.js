/*
 * @Description: API配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-09 22:23:09
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-18 21:45:57
 */

import { NODE_ENV } from './env.config';

const apiMap = {
  development: {
    PREFIX: '/api',
    CDN: '',
    BASE_URL: 'http://localhost:3030'
  },
  production: {
    PREFIX: '/api',
    CDN: 'https://cdn.ikmoons.com',
    BASE_URL: 'https://api.ikmoons.com'
  }
}

export default apiMap[NODE_ENV];
