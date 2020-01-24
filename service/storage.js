/*
 * @Description: 浏览器局部数据
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-09 01:23:22
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-24 13:50:08
 */

const userLikeHistory = 'user_like_history';

export const set = (key, data) => localStorage.setItem(key, data);
export const get = key => localStorage.getItem(key);
export const del = key => localStorage.removeItem(key);

export const buildStorage = key => ({
  set: data => set(key, JSON.stringify(data)),
  get: () => {
    const data = get(key);
    return data ? JSON.parse(data) : null;
  },
  remove: () => del(key)
})

export const localLikeHistory = buildStorage(userLikeHistory)
