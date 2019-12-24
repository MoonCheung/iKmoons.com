/*
 * @Description: 环境配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-09 23:10:44
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-24 23:38:36
 */

export const ENV = process.env;
export const NODE_ENV = ENV.NODE_ENV;
export const isDevMode = Object.is(NODE_ENV, 'development');
export const isProdMode = Object.is(NODE_ENV, 'production');
