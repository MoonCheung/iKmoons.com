import Koa from 'koa'

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

//手写koa2配置
// import mongoose from 'mongoose'
// import router from 'koa-router'
// import bodyparser from 'koa-bodyparser'
// import apiRouter from './routes'
//导入配置文件
// import confs from './config'

const app = new Koa()

// mongoose.connect(confs.mongodb)

// const index = router.get('/', ctx=> {
//   ctx.response.body = 'hello koa RESTful API'
// })

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  //手写koa2配置
  // app.use(bodyparser)
  // app.use(apiRouter.routes());
  // app.use(index.routes());

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
