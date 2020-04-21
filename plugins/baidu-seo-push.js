/*
 * @Description: 百度SEO推送
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-04-21 00:49:52
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-04-21 10:46:43
 */
import { isProdMode, isBrowser } from '@/config/env.config';

/* eslint no-unused-expressions: 0 */
if (isProdMode && isBrowser) {
  const baiduPush = href => {
    let curProtocol;
    // 获得协议
    if (!href) {
      curProtocol = window.location.protocol.split(':')[0];
    } else {
      curProtocol = href.split(':')[0];
    }
    // 指定脚本内容。用规范URL替换当前URL
    ! function() {
      const e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi;
      const r = href || window.location.href;
      const t = document.referrer;
      if (!e.test(r)) {
        let n = (String(curProtocol).toLowerCase() === 'https') ? "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif" : "//api.share.baidu.com/s.gif";
        t ? (n += "?r=" + encodeURIComponent(document.referrer), r && (n += "&l=" + r)) : r && (n += "?l=" + r);
        const i = new Image;
        i.src = n
      }
    }(window);
  }
  baiduPush()
  /*
   ** 应用挂载后
   */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      baiduPush(window.location.origin + to.fullPath)
    })
  })
}
