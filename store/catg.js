/*
 * @Description: 分类数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-18 22:53:11
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-21 14:05:04
 */

export const state = () => {
  return {
    list: {
      catgList: [],
      catgIcon: [
        { name: 'book', link: '//static.ikmoons.com/book.jpg' },
        { name: 'code', link: '//static.ikmoons.com/code.jpg' },
        { name: 'travel', link: '//static.ikmoons.com/travel.jpg' },
        { name: 'gear', link: '//static.ikmoons.com/gear.jpg' }
      ],
      fetching: false
    },
    appt: {
      paging: 0,
      catgList: [],
      noMore: "",
      fetching: false
    }
  }
}

export const getters = {
  catgList: (state) => {
    return state.list.catgList;
  },
  apptCatgList: (state) => {
    return state.appt.catgList
  },
  loadMore: (state) => {
    return state.appt.fetching;
  },
  noMore: (state) => {
    return state.appt.noMore;
  }
}

export const mutations = {
  // 获取所有分类列表
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
  },

  // 获取指定分类文章列表
  POST_APPT_CATG(state, data) {
    if (data.length <= 4) {
      state.appt.noMore = "没有更多了...";
      state.appt.catgList = data;
    } else {
      state.appt.noMore = "";
      state.appt.catgList = data;
    }
  },
  UPDATE_APPT_CATG(state, actions) {
    state.appt.fetching = actions;
  },

  // 获取更多指定分类文章列表
  POST_MORE_CATG(state, data) {
    if (data.length <= 4) {
      state.appt.paging = 0;
      state.appt.catgList.push(...data);
      state.appt.noMore = "没有更多了...";
    } else {
      state.appt.catgList.push(...data);
    }
  },
  UPDATE_MORE_CATG(state, actions) {
    const { page, fetching } = actions;
    if (fetching) {
      state.appt.paging = page;
      state.appt.fetching = fetching;
    } else {
      state.appt.fetching = fetching;
    }
  }
}

export const actions = {
  // 获取所有分类列表
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
  },

  // 获取指定分类文章列表
  async fetchApptCatg({ commit }, params) {
    try {
      commit('UPDATE_APPT_CATG', true)
      const param = {
        catg: params.name,
        page: 0
      }
      const data = await this.$axios.$post('/catg/fetchapptcatg', param);
      if (data.code === 1) {
        commit('POST_APPT_CATG', data.result);
        commit('UPDATE_APPT_CATG', false);
      }
    } catch (err) {
      commit('POST_APPT_CATG', null);
    }
  },

  // 获取更多指定分类文章列表
  async fetchMoreCatg({ commit, state }, params) {
    try {
      const isMore = {
        fetching: true,
        page: state.appt.paging + 1
      }
      commit('UPDATE_MORE_CATG', isMore);
      const param = {
        catg: params.name,
        page: state.appt.paging
      }
      const data = await this.$axios.$post('/catg/fetchapptcatg', param);
      if (data.code === 1) {
        commit('POST_MORE_CATG', data.result);
        commit('UPDATE_MORE_CATG', { fetching: false });
      }
    } catch (err) {
      commit('POST_MORE_CATG', null);
    }
  }
}
