/*
 * @Description: Googlo Gtag分析脚本
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-05-09 16:49:09
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-05-10 15:50:01
 */

import Vue from 'vue';
import VueGtag from 'vue-gtag';
import { isProdMode, isBrowser } from '@/config/env.config';

if (isBrowser) {
  window.onNuxtReady((app) => {
    const router = window.$nuxt.$router;
    Vue.use(VueGtag, {
      config: {
        id: "UA-165398101-1",
        params: {
          send_page_view: false
        }
      },
      debug: !isProdMode
    }, router)
  })
}
