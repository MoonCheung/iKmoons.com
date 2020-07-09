/*
 * @Description: 混合解析器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-17 23:05:10
 */

export const mixin = {
  filters: {
    filterComments(item) {
      const commentCount = item.cmt_count;
      let replyCount = 0;
      item.comments.map(elem => {
        replyCount += elem.reply_count;
      });
      const len = commentCount + replyCount;
      return Number.isNaN(len) ? 0 : len;
    }
  },
  // 计算属性且有缓存
  computed: {
    originState() {
      const mapOrigin = new Map([
        ['原创', ['--turquoise', '--turquoise-opacity']],
        ['转载', ['--cyan', '--cyan-opacity']],
        ['混合', ['--orange', '--orange-opacity']]
      ]);
      return state => {
        return {
          color: `var(${mapOrigin.get(state)[0]})`,
          'background-color': `var(${mapOrigin.get(state)[1]})`
        };
      };
    }
  },
  // 实例被挂载后调用
  mounted() {
    this.lazyLoadingImg();
  },
  // 该方法被混入实例
  methods: {
    // 懒加载图片方法
    lazyLoadingImg() {
      const el = document.querySelectorAll('img');
      const observer = lozad(el);
      observer.observe();
    }
  },
  // 实例销毁之后调用
  destroyed() {
    this.lazyLoadingImg();
  }
};
