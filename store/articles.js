/*
 * @Description: 文章数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-11 14:50:20
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-14 22:56:38
 */

export const state = () => {
  return {
    list: {
      paging: 0,
      artList: [],
      noMore: "",
      loadMore: false
    }
  }
}

export const getters = {
  artList: (state) => {
    return state.list.artList;
  },
  loadMore: (state) => {
    return state.list.loadMore;
  },
  noMore: (state) => {
    return state.list.noMore;
  }
}

export const mutations = {
  POST_ART_LIST(state, data) {
    if (data.length > 0) {
      state.list.noMore = ""
      state.list.loadMore = false;
      state.list.artList = data
    }
  },
  POST_MORE_ART(state, data) {
    if (data.length > 0) {
      state.list.loadMore = false;
      state.list.artList.push(...data);
    } else {
      state.list.paging = 0;
      state.list.noMore = "没有更多了..."
    }
  },
  ACTIVE_LOAD_MORE(state, data) {
    const { paging, loadMore } = data
    state.list.paging = paging;
    state.list.loadMore = loadMore;
  }
}

export const actions = {
  // 获取文章列表API
  async fetchAllArt({ commit }) {
    try {
      const data = await this.$axios.$post('/art/fetchallart', { page: 0 });
      if (data.code === 1) {
        commit('POST_ART_LIST', data.artList);
      }
    } catch (err) {
      console.log('error', err);
      commit('POST_ART_LIST', null);
    }
  },
  // 获取更多文章列表API
  async fetchMoreArt({ commit, state }) {
    try {
      const list = {
        loadMore: true,
        paging: state.list.paging + 1
      }
      commit('ACTIVE_LOAD_MORE', list);
      const param = {
        page: state.list.paging
      }
      const data = await this.$axios.$post('/art/fetchallart', param);
      if (data.code === 1) {
        commit('POST_MORE_ART', data.artList);
      }
    } catch (err) {
      console.log('error', err);
      commit('POST_MORE_ART', null);
    }
  }
}
