/*
 * @Description: 搜索数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-02-22 10:55:04
 */

export const state = () => {
  return {
    search: {
      paging: 0,
      keyWord: [],
      noMore: '',
      fetching: false
    }
  };
};

export const getters = {
  keyWordList: state => {
    return state.search.keyWord;
  },
  loadMore: state => {
    return state.search.fetching;
  },
  noMore: state => {
    return state.search.noMore;
  }
};

export const mutations = {
  // 获取文章关键词
  POST_ART_KEYWORD(state, data) {
    if (data.length <= 4) {
      state.search.noMore = '没有更多了...';
      state.search.keyWord = data;
    } else {
      state.search.noMore = '';
      state.search.keyWord = data;
    }
  },
  UPDATE_ART_KEYWORD(state, actions) {
    state.search.fetching = actions;
  },

  // 获取更多文章关键词
  POST_MORE_KEYWORD(state, data) {
    if (data.length <= 4) {
      state.search.paging = 0;
      state.search.keyWord.push(...data);
      state.search.noMore = '没有更多了...';
    } else {
      state.search.keyWord.push(...data);
    }
  },
  UPDATE_MORE_KEYWORD(state, actions) {
    const { page, fetching } = actions;
    if (fetching) {
      state.search.paging = page;
      state.search.fetching = fetching;
    } else {
      state.search.fetching = fetching;
    }
  }
};

export const actions = {
  // 获取文章关键词
  async fetchAtrKeyWord({ commit }, params) {
    try {
      commit('UPDATE_ART_KEYWORD', true);
      const param = {
        keyword: params.keyword,
        page: 0
      };
      await this.$axios.$post('/art/fetchkeyword', param).then(data => {
        if (data.code === 1) {
          commit('POST_ART_KEYWORD', data.result);
          commit('UPDATE_ART_KEYWORD', false);
        }
      });
    } catch (err) {
      commit('POST_ART_KEYWORD', null);
    }
  },

  // 获取更多文章关键词
  async fetchMoreKeyWord({ commit, state }, params) {
    try {
      const isMore = {
        fetching: true,
        page: state.search.paging + 1
      };
      commit('UPDATE_MORE_KEYWORD', isMore);
      const param = {
        keyword: params.keyword,
        page: state.search.paging
      };
      await this.$axios.$post('/art/fetchkeyword', param).then(data => {
        if (data.code === 1) {
          commit('POST_MORE_KEYWORD', data.result);
          commit('UPDATE_MORE_KEYWORD', { fetching: false });
        }
      });
    } catch (err) {
      commit('POST_MORE_KEYWORD', null);
    }
  }
};
