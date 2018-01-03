const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 8868
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const router = new Router()
    router.get('/', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
      ctx.respond = false
    })

    router.get('/search', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/search', ctx.query)
      ctx.respond = false
    })

    router.get('/loan', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/1-loan/1-home', ctx.query)
      ctx.respond = false
    })

    router.get('/loan/go', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/1-loan/3-goLoan', ctx.query)
      ctx.respond = false
    })

    router.get('/loan/:id', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/1-loan/2-detail', ctx.query)
      ctx.respond = false
    })

    router.get('/card', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/1-home', ctx.query)
      ctx.respond = false
    })

    router.get('/card/list', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/2-list', ctx.query)
      ctx.respond = false
    })

    router.get('/card/:id', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/3-detail', ctx.query)
      ctx.respond = false
    })

    router.get('/me', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/1-home', ctx.query)
      ctx.respond = false
    })

    router.get('/login', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/2-login', ctx.query)
      ctx.respond = false
    })

    router.get('/me/favorite', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/3-favorite', ctx.query)
      ctx.respond = false
    })

    router.get('/me/history', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/4-history', ctx.query)
      ctx.respond = false
    })

    router.get('/me/about', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/5-about', ctx.query)
      ctx.respond = false
    })

    router.get('/me/feedback', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/6-feedback', ctx.query)
      ctx.respond = false
    })

    router.get('/me/data', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/7-myData', ctx.query)
      ctx.respond = false
    })

    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    const server = new Koa()
    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())

    server.listen(port, (err) => {
      if (err) throw err
      console.info(`> Ready on http://localhost:${port}`)
    })
  })


// function handle(middleware) {
//   return async (ctx) => {
//     ctx.body = await new Promise((resolve) => {
//       const END = ctx.res.end

//       // Hijack stream to set ctx.body
//       const pipe = (stream) => {
//         ctx.res.end = END
//         stream.unpipe(ctx.res)
//         resolve(stream)
//       }
//       ctx.res.once('pipe', pipe)

//       // Monkey patch res.end to set ctx.body
//       ctx.res.end = (body) => {
//         ctx.res.end = END
//         ctx.res.removeListener('pipe', pipe)
//         resolve(body)
//       }

//       // Create res.redirect method
//       ctx.res.redirect = (url, status, message) => {
//         if (status) ctx.status = status
//         ctx.redirect(url)
//         if (message) ctx.body = message
//       }

//       middleware(ctx)
//     })
//   }
// }
