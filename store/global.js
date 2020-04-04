/*
 * @Description: 全局数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-13 21:33:19
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-04-04 15:52:45
 */

export const state = () => ({
  // 设备类型
  userAgent: '',
  // 是否移动端
  isMobile: false,
  // 是否微信移动端
  isWeChat: false,
  // 当前年份时间
  getYearTime: new Date(),
  // blob path
  blobPath: [],
})

export const getters = {
  getYearTime: state => {
    return state.getYearTime.getFullYear();
  }
}

export const mutations = {
  // 更新设备类型
  UPDATE_DEVICE_TYPE(state, deviceType) {
    state.userAgent = deviceType;
  },
  // 设置是否移动端状态
  UPDATE_MOBILE_STATUS(state, action) {
    state.isMobile = action;
  },
  // 设置是否微信移动端状态
  UPDATE_WECHAT_STATUS(state, action) {
    state.isWeChat = action;
  },
  // blob对象源路径
  UPDATE_BLOB_PATH(state, blob){
    state.blobPath.push(blob)
  }
}

export const actions = {
  // 源路径转换blob对象
  sourcePathToBlob({ state,commit }, path){
    return new Promise((resolve, reject) => {
      this.$axios.request({
        url: path,
        responseType: 'blob'
      }).then(res => {
        commit('UPDATE_BLOB_PATH', res.data);
        resolve(state.blobPath);
      }).catch(err => {
        reject(err);
      });
    })
  }
}
