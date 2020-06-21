/*
 * @Description: Google Adsense
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-06-21 13:35:58
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-06-21 13:47:50
 */

import Vue from 'vue';
import Ads from 'vue-google-adsense';

Vue.use(require('vue-script2'));

Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);
Vue.use(Ads.AutoAdsense, { adClient: 'ca-pub-7274877586602348' });
