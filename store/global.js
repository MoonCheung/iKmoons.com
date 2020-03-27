/*
 * @Description: 全局数据状态
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-13 21:33:19
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-24 23:01:27
 */

export const state = () => ({
  // 设备类型
  userAgent: '',
  // 是否移动端
  isMobile: false,
  // 当前年份时间
  getYearTime: new Date(),
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
  }
}
