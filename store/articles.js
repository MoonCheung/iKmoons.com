/*
 * @Description: 文章数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-11 14:50:20
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-02-22 21:38:58
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
  },
  artDeilLen: (state) => {
    const cmtCount = state.deil.artDeil.cmt_count;
    let count = 0;
    state.deil.artDeil.comments.map(item => {
      if (item.reply_count === undefined && item.reply_count === 0) {
        count = 0;
      } else {
        count += item.reply_count;
      }
    })
    const len = count + cmtCount;
    return len;
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
  // 添加评论列表
  ADD_COMMENT_LIST(state, data) {
    ++state.deil.artDeil.cmt_count;
    state.deil.artDeil.comments.unshift(data);
  },
  // 添加回复评论列表
  ADD_REPLY_COMMENT(state, data) {
    state.deil.artDeil.comments.map(item => {
      if (item.id === data.parentId) {
        ++item.reply_count;
        item.replys.push(data);
      }
    })
  },
  // 更新点赞文章详情
  ADD_LIKE_ART_PAGE(state, { like }) {
    state.deil.artDeil.like = like
  },
  // 更新点赞评价
  ADD_LIKE_COMMENT(state, data) {
    state.deil.artDeil.comments.map(elem => {
      if (elem.id === data.id) {
        elem.like = data.like;
      }
    })
  },
  // 更新点赞被评价回复
  ADD_LIKE_REPLY(state, data) {
    state.deil.artDeil.comments.map(elem => {
      if (elem.id === data.comment_id) {
        elem.replys.map(subElem => {
          if (subElem.id === data.id) {
            subElem.like = data.like;
          }
        })
      }
    })
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
      await this.$axios.$post('/art/fetchallart', { page: 0 }).then(data => {
        if (data.code === 1) {
          commit('POST_ART_LIST', data.result);
          commit('UPDATE_ART_LIST', false);
        }
      });
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
      await this.$axios.$post('/art/fetchallart', param).then(data => {
        if (data.code === 1) {
          commit('POST_MORE_ART', data.result);
          commit('UPDATE_MORE_ART', { fetching: false });
        }
      });
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
      await this.$axios.$post('/art/fetchartdeil', param).then(data => {
        if (data.code === 1) {
          commit('GET_ART_DEIL', data.result);
          commit('UPDATE_ART_DEIL', false);
        }
      });
    } catch (err) {
      commit('GET_ART_DEIL', null);
    }
  },

  // 获取热门文章列表接口
  async fetchHotArt({ commit }) {
    try {
      commit('UPDATE_HOT_ARTLIST', true);
      await this.$axios.$get('/art/fetchhotart').then(data => {
        if (data.code === 1) {
          commit('GET_HOT_ARTLIST', data.result);
          commit('UPDATE_HOT_ARTLIST', false);
        }
      });
    } catch (err) {
      commit('GET_HOT_ARTLIST', null);
    }
  },

  // 获取文章归档接口
  async fetchArtArch({ commit }) {
    try {
      commit('UPDATE_ART_ARCH', true);
      await this.$axios.$get('/art/fetchartarch').then(data => {
        if (data.code === 1) {
          commit('GET_ART_ARCH', data);
          commit('UPDATE_ART_ARCH', false);
        }
      });
    } catch (err) {
      commit('GET_ART_ARCH', null);
    }
  },

  // 添加评论列表
  async submitComment({ commit }, param) {
    try {
      if (param.replyId === '' && param.subReplyId === '') {
        commit('UPDATE_ART_DEIL', true);
        await this.$axios.$post('/cmt/fetchaddcmt', param).then(data => {
          if (data.code === 1) {
            commit('ADD_COMMENT_LIST', data.result);
            commit('UPDATE_ART_DEIL', false);
          }
        });
      } else if (param.replyId !== '' && param.subReplyId === '') {
        commit('UPDATE_ART_DEIL', true);
        await this.$axios.$post('/cmt/addreplycmt', param).then(replyData => {
          if (replyData.code === 1) {
            commit('ADD_REPLY_COMMENT', replyData.result);
            commit('UPDATE_ART_DEIL', false);
          }
        });
      } else {
        commit('UPDATE_ART_DEIL', true);
        await this.$axios.$post('/cmt/addsubreply', param).then(subReplyData => {
          if (subReplyData.code === 1) {
            commit('ADD_REPLY_COMMENT', subReplyData.result);
            commit('UPDATE_ART_DEIL', false);
          }
        });
      }
    } catch (err) {
      commit('ADD_COMMENT_LIST', null);
      commit('ADD_REPLY_COMMENT', null);
    }
  },

  // 更新点赞文章API
  async fetchLikeArt({ commit }, id) {
    try {
      commit('UPDATE_ART_DEIL', true);
      return await this.$axios.$patch(`/art/updlikeart/${id}`).then(data => {
        return new Promise(resolve => {
          if (data.code === 1) {
            commit('ADD_LIKE_ART_PAGE', data.result);
            commit('UPDATE_ART_DEIL', false);
            resolve(data.result);
          }
        })
      });
    } catch (err) {
      commit('ADD_LIKE_ART_PAGE', null);
    }
  },

  // 更新点赞评论API
  async fetchLikeComment({ commit }, param) {
    try {
      if (param.type === 'comment') {
        commit('UPDATE_ART_DEIL', true);
        return await this.$axios.$patch(`/cmt/updlikecmt/${param.type}/${param.id}`).then(data => {
          return new Promise(resolve => {
            if (data.code === 1) {
              commit('ADD_LIKE_COMMENT', data.result);
              commit('UPDATE_ART_DEIL', false);
              resolve(data.result)
            }
          })
        });
      } else if (param.type === 'reply') {
        commit('UPDATE_ART_DEIL', true);
        return await this.$axios.$patch(`/cmt/updlikecmt/${param.type}/${param.id}`).then(data => {
          return new Promise(resolve => {
            if (data.code === 1) {
              commit('ADD_LIKE_REPLY', data.result);
              commit('UPDATE_ART_DEIL', false);
              resolve(data.result)
            }
          })
        });
      }
    } catch (err) {
      commit('ADD_LIKE_COMMENT', null);
      commit('ADD_LIKE_REPLY', null);
    }
  }
}
