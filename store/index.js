/*
 * @Description: store状态树
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-16 17:34:50
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-31 15:56:46
 */

import { isServer } from '@/config/env.config';
import { usParser } from '@/utils/index';

export const actions = {
  nuxtServerInit(store, { req }) {
    // 用于检测设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
    // ua 解析设备
    const { isMobile, isWechat } = usParser(userAgent);
    // 提交store数据变化
    store.commit('global/UPDATE_DEVICE_TYPE', userAgent);
    store.commit('global/UPDATE_MOBILE_STATUS', isMobile);
    store.commit('global/UPDATE_WECHAT_STATUS', isWechat);

    // 创建空数组
    const initArray = [];
    initArray.push(
      store.dispatch('articles/fetchHotArt'),
      store.dispatch('tags/fetchTagList'),
      store.dispatch('catg/fetchCatgList')
    );
    return Promise.all(initArray);
  }
}
