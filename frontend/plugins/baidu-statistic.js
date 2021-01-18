/*
 * @Description: 百度统计脚本
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-05-09 16:26:01
 */

import { isProdMode, isBrowser } from '@/config/env.config';

if (isProdMode && isBrowser) {
  (function() {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?bf21ffdf1dc27277bfd830fd78229166';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
  /*
   ** 应用挂载后
   */
  window.onNuxtReady(app => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      window._hmt = window._hmt || [];
      window._hmt.push([
        '_requirePlugin',
        'UrlChangeTracker',
        {
          shouldTrackUrlChange: function(newPath = to.fullPath, oldPath = from.fullPath) {
            newPath = newPath.split('?')[0];
            oldPath = oldPath.split('?')[0];
            return newPath != oldPath;
          }
        }
      ]);
    });
  });
}
