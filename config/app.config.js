/*
 * @Description: APP配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-17 13:49:31
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-18 21:43:52
 */


export const constant = {
  menus: [
    { route: '/', name: '首页' },
    { route: '/archive', name: '归档' },
    { route: '/about', name: '关于' }
  ],
  about: {
    name: 'MoonCheung',
    desc: '90后，热衷于新技术的学习，较喜欢折腾和阅读，轻微强迫症，对代码有一些洁癖👋',
    hobby: [
      { name: '日漫，' },
      { name: '旅行，' },
      { name: '登山，' },
      { name: '看书，' },
      { name: '下厨' }
    ],
    skill: [
      { name: 'Nodejs，' },
      { name: 'Vue，' },
      { name: 'React，' },
      { name: '小程序' },
    ],
    tags: [
      { name: '技术爱好者，' },
      { name: '日漫爱好者' },
    ]
  }
}
