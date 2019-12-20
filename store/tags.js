/*
 * @Description: 标签数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-16 23:20:20
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-12-20 23:58:11
 */


export const state = () => {
  return {
    list: {
      tagList: [],
      fetching: false
    },
    appt: {
      paging: 0,
      tagList: [],
      noMore: "",
      fetching: false
    }
  }
}

export const getters = {
  tagList: (state) => {
    return state.list.tagList;
  },
  apptTagList: (state) => {
    return state.appt.tagList;
  },
  loadMore: (state) => {
    return state.appt.fetching;
  },
  noMore: (state) => {
    return state.appt.noMore;
  }
}

export const mutations = {
  // 获取所有标签列表
  GET_TAG_LIST(state, data) {
    state.list.tagList = data;
  },
  UPDATE_TAG_DATA(state, actions) {
    state.list.fetching = actions;
  },

  // 获取指定标签文章列表
  POST_APPT_TAG(state, data) {
    state.appt.noMore = "";
    state.appt.tagList = data;
  },
  UPDATE_APPT_TAG(state, actions) {
    state.list.fetching = actions;
  },

  // 获取更多指定标签文章列表
  POST_MORE_TAGS(state, data) {
    if (data.length <= 4) {
      state.appt.paging = 0;
      state.appt.tagList.push(...data);
      state.appt.noMore = "没有更多了...";
    } else {
      state.appt.tagList.push(...data);
    }
  },
  UPDATE_MORE_TAGS(state, actions) {
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
  // 获取所有标签列表
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
  },

  // 获取指定标签文章列表
  async fetchApptTags({ commit }, params) {
    try {
      commit('UPDATE_APPT_TAG', true);
      const param = {
        tag: params.name,
        page: 0
      }
      const data = await this.$axios.$post('/tag/fetchappttag', param);
      if (data.code === 1) {
        commit('POST_APPT_TAG', data.result);
        commit('UPDATE_APPT_TAG', false);
      }
    } catch (err) {
      commit('POST_APPT_TAG', null);
    }
  },

  // 获取更多指定标签文章列表
  async fetchMoreTags({ commit, state }, params) {
    try {
      const isMore = {
        fetching: true,
        page: state.appt.paging + 1
      }
      commit('UPDATE_MORE_TAGS', isMore);
      const param = {
        tag: params.name,
        page: state.appt.paging
      }
      const data = await this.$axios.$post('/tag/fetchappttag', param);
      if (data.code === 1) {
        commit('POST_MORE_TAGS', data.result);
        commit('UPDATE_MORE_TAGS', { fetching: false });
      }
    } catch (err) {
      commit('POST_MORE_TAGS', null);
    }
  }
}
