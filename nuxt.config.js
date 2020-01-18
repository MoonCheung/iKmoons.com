import path from 'path';
import apiMap from './config/api.config';
import { isDevMode } from './config/env.config';

module.exports = {
  // srcDir: path.resolve(__dirname),
  // rootDir: path.resolve(__dirname, '..'),
  mode: 'universal',
  /**
   * Dev property configuration
   */
  dev: isDevMode,
  /**
   * Environment configuration
   */
  env: {
    BASE: apiMap.BASE_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1.0,user-scalable=no' },
      { name: "MobileOptimized", content: "320" },
      { name: "HandheldFriendly", content: "true" },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
  /*
   ** Global CSS
   */
  css: [
    'normalize.css/normalize.css',
    'highlight.js/styles/monokai-sublime.css',
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
    elementClass: 'icon'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/markdown' },
    { src: '@/plugins/highlight' },
    { src: '@/plugins/particles', ssr: false }
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
    proxy: true,
    prefix: apiMap.PREFIX,
    credentials: true,
    baseURL: apiMap.BASE_URL + apiMap.PREFIX
  },
  /**
   * Development environment configuration
   */
  proxy: {
    '/api': apiMap.BASE_URL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
