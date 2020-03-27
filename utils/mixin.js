/*
 * @Description: 混合解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-17 23:05:10
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-27 11:23:58
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
  },
  computed: {
    originState() {
      const mapOrigin = new Map([
        ['原创', ['--turquoise', '--turquoise-opacity']],
        ['转载', ['--cyan', '--cyan-opacity']],
        ['混合', ['--orange', '--orange-opacity']]
      ])
      return state => {
        return {
          color: `var(${mapOrigin.get(state)[0]})`,
          'background-color': `var(${mapOrigin.get(state)[1]})`
        }
      }
    },
  }
}
