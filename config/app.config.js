/*
 * @Description: APP配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-01-17 13:49:31
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-08 23:58:04
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
      { name: '下厨，' },
      { name: '健身' }
    ],
    skill: [
      { name: 'Nodejs，' },
      { name: 'Vue，' },
      { name: 'React，' },
      { name: '小程序' },
    ],
    tags: [
      { name: '技术爱好者，' },
      { name: '日漫爱好者，' },
      { name: '自由开发者' },
    ]
  },
  meta: {
    title: 'ikmoons.com',
    site: 'ikmoons.com',
    keys: 'iKmoons,MoonCheung,Blog,前端开发者,Javascript技术',
    desc: '人生路漫漫，何曾有坦途',
    email: 'salvador23@163.com'
  }
}

export const partConfig = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#bfbfbf"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 8,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 0.4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
