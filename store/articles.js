/*
 * @Description: 文章数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-11 14:50:20
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-22 21:54:50
 */

export const state = () => {
  return {
    list: {
      paging: 0,
      artList: [],
      noMore: "",
      fetching: false
    },
    deil: {
      artDeil: {},
      fetching: false
    },
    hot: {
      hotArtList: [],
      fetching: false
    },
    arch: {
      artList: [],
      count: 0,
      fetching: false
    }
  }
}

export const getters = {
  artList: (state) => {
    return state.list.artList;
  },
  loadMore: (state) => {
    return state.list.fetching;
  },
  noMore: (state) => {
    return state.list.noMore;
  },
  artDeil: (state) => {
    return state.deil.artDeil;
  }
}

export const mutations = {
  // 获取文章列表API
  POST_ART_LIST(state, data) {
    if (data.length > 0) {
      state.list.paging = 0;
      state.list.noMore = "";
      state.list.artList = data;
    }
  },
  UPDATE_ART_LIST(state, actions) {
    state.list.fetching = actions;
  },

  // 获取更多文章列表API
  POST_MORE_ART(state, data) {
    if (data.length <= 4) {
      state.list.paging = 0;
      state.list.noMore = "没有更多了..."
      state.list.artList.push(...data);
    } else {
      state.list.noMore = "";
      state.list.artList.push(...data);
    }
  },
  UPDATE_MORE_ART(state, actions) {
    const { paging, fetching } = actions
    if (fetching) {
      state.list.paging = paging;
      state.list.fetching = fetching;
    } else {
      state.list.fetching = fetching;
    }
  },

  // 获取指定ID的文章详情API
  GET_ART_DEIL(state, data) {
    state.deil.artDeil = data;
  },
  UPDATE_ART_DEIL(state, actions) {
    state.deil.fetching = actions;
  },

  // 获取热门文章列表接口
  GET_HOT_ARTLIST(state, data) {
    state.hot.hotArtList = data;
  },
  UPDATE_HOT_ARTLIST(state, actions) {
    state.hot.fetching = actions;
  },

  // 获取文章归档接口
  GET_ART_ARCH(state, { result, count }) {
    state.arch.count = count;
    state.arch.artList = result;
  },
  UPDATE_ART_ARCH(state, actions) {
    state.arch.fetching = actions;
  }
}

export const actions = {
  // 获取文章列表API
  async fetchAllArt({ commit }) {
    try {
      commit('UPDATE_ART_LIST', true);
      const data = await this.$axios.$post('/art/fetchallart', { page: 0 });
      if (data.code === 1) {
        commit('POST_ART_LIST', data.result);
        commit('UPDATE_ART_LIST', false);
      }
    } catch (err) {
      commit('POST_ART_LIST', null);
    }
  },

  // 获取更多文章列表API
  async fetchMoreArt({ commit, state }) {
    try {
      const list = {
        fetching: true,
        paging: state.list.paging + 1
      }
      commit('UPDATE_MORE_ART', list);
      const param = {
        page: state.list.paging
      }
      const data = await this.$axios.$post('/art/fetchallart', param);
      if (data.code === 1) {
        commit('POST_MORE_ART', data.result);
        commit('UPDATE_MORE_ART', { fetching: false });
      }
    } catch (err) {
      commit('POST_MORE_ART', null);
    }
  },

  // 获取指定ID的文章详情API
  async getArtDeil({ commit }, query) {
    try {
      commit('UPDATE_ART_DEIL', true);
      const param = {
        id: query.id
      }
      const data = await this.$axios.$post('/art/fetchartdeil', param);
      if (data.code === 1) {
        commit('GET_ART_DEIL', data.result);
        commit('UPDATE_ART_DEIL', false);
      }
    } catch (err) {
      commit('GET_ART_DEIL', null);
    }
  },

  // 获取热门文章列表接口
  async fetchHotArt({ commit }) {
    try {
      commit('UPDATE_HOT_ARTLIST', true);
      const data = await this.$axios.$get('/art/fetchhotart');
      if (data.code === 1) {
        commit('GET_HOT_ARTLIST', data.result);
        commit('UPDATE_HOT_ARTLIST', false);
      }
    } catch (err) {
      commit('GET_HOT_ARTLIST', null);
    }
  },

  // 获取文章归档接口
  async fetchArtArch({ commit }) {
    try {
      commit('UPDATE_ART_ARCH', true);
      const data = await this.$axios.$get('/art/fetchartarch');
      if (data.code === 1) {
        commit('GET_ART_ARCH', data);
        commit('UPDATE_ART_ARCH', false);
      }
    } catch (err) {
      commit('GET_ART_ARCH', null);
    }
  }
}
