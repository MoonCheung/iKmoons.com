/*
 * @Description: 懒加载
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-04-10 00:26:32
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-04-10 00:30:06
 */

import lozad from 'lozad';
import { isBrowser } from '@/config/env.config';

if (isBrowser) {
  window.lozad = lozad;
}
