/*
 * @Description: store状态树
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-16 17:34:50
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-11 22:23:34
 */


export const actions = {
  nuxtServerInit({ dispatch }) {
    // 创建空数组
    const initArray = [];
    initArray.push(
      dispatch('articles/fetchHotArt'),
      dispatch('tags/fetchTagList'),
      dispatch('catg/fetchCatgList')
    );
    return Promise.all(initArray);
  }
}
