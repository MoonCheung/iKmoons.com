/*
 * @Description: HTML 多媒体
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-03-29 23:17:46
 */

import Plyr from 'plyr';
import { isBrowser } from '@/config/env.config';

if (isBrowser) {
  window.Plyr = Plyr;
}
