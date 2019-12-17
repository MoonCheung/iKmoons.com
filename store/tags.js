/*
 * @Description: 标签数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-16 23:20:20
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-17 14:56:19
 */


export const state = () => {
  return {
    list: {
      tagList: [],
      fetching: false
    }
  }
}

export const mutations = {
  GET_TAG_LIST(state, data) {
    state.list.tagList = data;
  },
  UPDATE_TAG_DATA(state, actions) {
    state.list.fetching = actions;
  }
}

export const actions = {
  async fetchTagList({ commit }) {
    try {
      commit('UPDATE_TAG_DATA', true);
      const data = await this.$axios.$get('/tag/fetchalltag');
      if (data.code === 1) {
        commit('GET_TAG_LIST', data.result);
        commit('UPDATE_TAG_DATA', false);
      }
    } catch (err) {
      commit('GET_TAG_LIST', null);
    }
  }
}
