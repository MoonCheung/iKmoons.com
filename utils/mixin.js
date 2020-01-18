/*
 * @Description: 混合解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-17 23:05:10
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-18 15:04:23
 */

export const mixin = {
  filters: {
    filterComments(item) {
      const commentCount = item.cmt_count;
      let replyCount = 0;
      item.comments.map(elem => {
        replyCount += elem.reply_count;
      })
      const len = commentCount + replyCount;
      return Number.isNaN(len) ? 0 : len;
    }
  }
}
