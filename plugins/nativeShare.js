/*
 * @Description: 分享
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-03-25 14:27:06
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-30 01:25:41
 */

import NativeShare from 'nativeshare';
import { isBrowser } from '@/config/env.config';

const nativeShare = new NativeShare();

if (isBrowser) {
  window.nativeShare = nativeShare;
}

export default nativeShare;
