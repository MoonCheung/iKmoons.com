/*
 * @Description: markdown-it配置及其扩展
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-28 00:46:47
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-22 17:44:41
 */

import Vue from 'vue';
import Markdown from 'markdown-it';
import abbr from 'markdown-it-abbr';
import deflist from 'markdown-it-deflist';
import emoji from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';
import imagesPreview from 'markdown-it-images-preview';
import ins from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import taskLists from 'markdown-it-task-lists';
import toc from 'markdown-it-toc';
import hljs from '@/plugins/highlight';

const config = {
  html: true,
  breaks: false,
  linkify: false,
  injected: true,
  xhtmlOut: true,
  langPrefix: 'md-',
  quotes: '“”‘’',
  // 高亮显示
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }
    // 如果没有语言设置，则显示为纯文本
    return '<pre class="hljs"><code>' + hljs.highlight('plaintext', str, true).value + '</code></pre>'
  }
}

const md = new Markdown(config).use(abbr)
  .use(deflist)
  .use(emoji)
  .use(footnote)
  .use(imagesPreview)
  .use(ins)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(taskLists)
  .use(toc)

// 全局挂载
Vue.prototype.$md = md;
