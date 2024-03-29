/*
 * @Description: Environment configuration
 * @Author: MoonCheung
 * @Date: 2021-05-13 00:05:25
 * @Copyright 2021 MoonCheung
 */

export const ENV = process.env;
export const NODE_ENV = ENV.NODE_ENV;
export const isDevMode = Object.is(NODE_ENV, 'development');
export const isProdMode = Object.is(NODE_ENV, 'production');
export const CONTENT_PATH = './src/pages/content' as string;
