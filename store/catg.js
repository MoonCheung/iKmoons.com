/*
 * @Description: 分类数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-18 22:53:11
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-19 20:49:02
 */

export const state = () => {
  return {
    list: {
      catgList: [],
      catgIcon: [
        { name: 'code', link: '//static.ikmoons.com/code.jpg' },
        { name: 'book', link: '//static.ikmoons.com/book.jpg' },
        { name: 'gear', link: '//static.ikmoons.com/gear.jpg' },
        { name: 'travel', link: '//static.ikmoons.com/travel.jpg' }
      ],
      fetching: false
    }
  }
}

export const mutations = {
  GET_CATG_LIST(state, data) {
    const keys = {};
    const IconKey = state.list.catgIcon;
    data.forEach((key, index) => {
      const name = Object.keys(key)[2];
      const link = Object.keys(key)[3];
      keys[name] = IconKey[index][name];
      keys[link] = IconKey[index][link];
      Object.assign(key, keys);
    })
    state.list.catgList = data;
  },
  UPDATE_CATG_DATA(state, actions) {
    state.list.fetching = actions;
  }
}

export const actions = {
  async fetchCatgList({ commit }) {
    try {
      commit('UPDATE_CATG_DATA', true);
      const data = await this.$axios.$get('/catg/fetchallcatg');
      if (data.code === 1) {
        commit('GET_CATG_LIST', data.result);
        commit('UPDATE_CATG_DATA', false);
      }
    } catch (err) {
      commit('GET_TAG_LIST', null);
    }
  }
}
