import path from 'path';
import apiMap from './config/api.config';
import { constant } from './config/app.config';
import { isDevMode } from './config/env.config';

module.exports = {
  mode: 'universal',
  server: {
    host: '127.0.0.1',
    port: 3031,
  },
  // srcDir: path.resolve(__dirname),
  // rootDir: path.resolve(__dirname, '..'),
  /**
   * Dev property configuration
   */
  dev: isDevMode,
  /**
   * Environment configuration
   */
  env: {
    BASE: apiMap.BASE_URL + apiMap.PREFIX
  },
  /*
   ** Headers of the page
   */
  head: {
    title: `${constant.meta.title} - ${constant.meta.desc}`,
    titleTemplate: `%s | ${constant.meta.site}`,
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1.0,user-scalable=no' },
      { name: "MobileOptimized", content: "320" },
      { name: "HandheldFriendly", content: "true" },
      { name: 'apple-mobile-web-app-title', content: `${constant.meta.title} | ${constant.meta.desc}` },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'author', content: constant.meta.email },
      { name: 'X-UA-Compatible', content: "IE=edge,chrome=1" },
      { hid: 'keywords', name: 'keywords', content: constant.meta.keys },
      { hid: 'description', name: 'description', content: constant.meta.desc }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#0288D1'
  },
  /**
   * icon 图标
   */
  icon: {
    iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152, 192, 384, 512]
  },
  /*
   ** Global CSS
   */
  css: [
    'normalize.css/normalize.css',
    'highlight.js/styles/monokai-sublime.css',
    'github-markdown-css/github-markdown.css',
    'plyr/dist/plyr.css',
    '@/assets/styles/index'
  ],
  /**
   * route configuration
   */
  router: {
    linkExactActiveClass: 'navbar-active'
  },
  /**
   * Preprocessor configuration
   */
  styleResources: {
    scss: './assets/styles/init.scss',
  },
  /**
   * svg configuration
   */
  svgSprite: {
    input: '~/assets/sprite/svg',
    output: '~/assets/sprite/gen',
    defaultSprite: 'icons',
    elementClass: 'icon',
    publicPath: '/_nuxt/',
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/player' },
    { src: '@/plugins/markdown' },
    { src: '@/plugins/highlight' },
    { src: '@/plugins/particles', ssr: false },
    { src: '@/plugins/nativeShare', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/component-cache',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/toast'
  ],
  /**
   * Touch Toast in response
   */
  toast: {
    position: "top-right",
    duration: 3000,
    action: {
      text: '关闭',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: apiMap.BASE_URL + apiMap.PREFIX
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    analyza: {
      analyzeMode: 'static'
    },
    extractCSS: true,
    publicPath: apiMap.CDN + '/_nuxt/',
    // 性能优化配置
    optimization: {
      splitChunks: {
        name: true,
        chunks: 'all',
        minSize: 360000,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /highlight|markdown-it|particles|ua-parser-js|github-markdown-css|nativeshare|qrcode-generator/,
            priority: 10,
            chunks: 'initial'
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
    },
    // extend webpack config
    extend(config, ctx) {}
  }
}
