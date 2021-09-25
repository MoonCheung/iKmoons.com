/*
 * @Description: App config
 * @Author: MoonCheung
 * @Date: 2021-05-13 00:05:25
 * @Copyright 2021 MoonCheung
 */

export const constant: any = {
  logos: 'iKmoons - 个人博客会随时撰写技术文章以及个人生活，分享他人',
  menus: [
    { route: '/', name: '首页' },
    { route: '/about', name: '关于' }
  ],
  catgIcon: [
    { icon: 'Outdoor', name: '生活心得', link: '//static.ikmoons.com/travel.jpg' },
    { icon: 'SettingTwo', name: '技术心得', link: '//static.ikmoons.com/gear.jpg' },
    { icon: 'BookOne', name: '开卷益处', link: '//static.ikmoons.com/book.jpg' },
    { icon: 'Code', name: '码不停蹄', link: '//static.ikmoons.com/code.jpg' }
  ],
  about: {
    name: 'MoonCheung',
    desc: '90后，热衷于新技术的学习，较喜欢折腾和阅读，轻微强迫症，对代码有一些洁癖👋',
    hobby: ['日漫', '旅行', '登山', '看书', '下厨', '健身'],
    skill: ['Nodejs', 'Vue', 'React', '小程序'],
    tags: ['技术爱好者', '日漫爱好者', '自由开发者']
  },
  meta: {
    title: 'ikmoons.com',
    site: 'ikmoons.com',
    keys: 'iKmoons,MoonCheung,Blog,前端开发者,自由开发者,Javascript技术',
    desc: '人生路漫漫，何曾有坦途 - 保持学习态度重要,技术随着时间日异月新,不能落后于前沿技术,没有捷径之路,只有靠自己不断努力学,突破自我',
    email: 'ikmoons.is@gmail.com'
  }
};

// 粒子效果配置
export const partConfig: object = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#bfbfbf'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 6
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: false,
        speed: 0.4,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse'
      },
      onclick: {
        enable: false,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: {
        distance: 400,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

// Plyr 多媒体配置
export const plyrConfig: object = {
  invertTime: false,
  settings: ['captions', 'quality', 'speed', 'loop'],
  i18n: {
    restart: '重新播放',
    rewind: '倒退 {seektime} 秒',
    play: '播放',
    pause: '暫停',
    fastForward: '向前 {seektime} 秒',
    seek: 'Seek',
    played: 'Played',
    buffered: '缓冲',
    currentTime: '当前时间',
    duration: '持续时间',
    volume: '体积',
    mute: '静音',
    unmute: '取消静音',
    enableCaptions: '开启字幕',
    disableCaptions: '关闭字幕',
    enterFullscreen: '进入全屏幕',
    exitFullscreen: '退出全屏幕',
    frameTitle: 'Player for {title}',
    captions: '字幕',
    settings: '设定',
    speed: '速率',
    normal: '正常',
    quality: '质量',
    loop: 'Loop',
    start: '开始',
    end: '结束',
    all: '全部',
    reset: '重置',
    disabled: '禁用',
    enabled: '启用',
    advertisement: '广告'
  },
  quality: { default: 576, options: [1080, 720] },
  loop: { active: false }
};
