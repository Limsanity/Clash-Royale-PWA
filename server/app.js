const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const https = require('https')

const apiRouter = require('./router/api')
const userRouter = require('./router/user')
const { User, Deck } = require('./utils/sql')

User.sync({ force: false })
Deck.sync({ force: false })

const app = new Koa()
const options = {
  key: fs.readFileSync(path.join(__dirname, './certificate/2_www.pomo16.club.key')),
  cert: fs.readFileSync(path.join(__dirname, './certificate/1_www.pomo16.club_bundle.crt'))
}

let sessionConfig = {
  key: 'SESSION_ID',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: false,
  signed: false
}

app.use(session(sessionConfig, app))
app.use(bodyParser())
app.use(historyApiFallback({
  index: '/'
}))
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(koaStatic(path.join(__dirname) + '/../dist/'))

https.createServer(options, app.callback()).listen(3001)
