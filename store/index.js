/*
 * @Description: store状态树
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-16 17:34:50
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-17 14:36:30
 */


export const actions = {
  nuxtServerInit({ dispatch }) {
    // 创建空数组
    const initArray = [];
    initArray.push(
      dispatch('articles/fetchHotArt'),
      dispatch('tags/fetchTagList')
    );
    return Promise.all(initArray);
  }
}
