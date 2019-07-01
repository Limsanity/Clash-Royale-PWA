const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const tokenExpiresTime = 60 * 60
const jwtSecret = 'jwtSecret'
const { findUserByName, addUser, login } = require('../utils/query')
const userRouter = new Router({ prefix: '/auth' })

userRouter.get('/logout', async ctx => {
  if (ctx.session && ctx.session.username) {
    ctx.session = null
    ctx.body = {
      msg: 'log out successfully'
    }
  }
})

userRouter.post('/login', async ctx => {
  if (ctx.session && ctx.session.username) {
    let payload = {
      name: ctx.session.username,
    }
    let token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiresTime })
    ctx.body = {
      success: true,
      data: {
        username: ctx.session.username,
        token
      }
    }
  } else {
    const body = ctx.request.body
    let result;
    if (body.username) {
      result = await login(body.username, body.password)
    }
    if (result) {
      ctx.session = {
        username: body.username,
        userID: result.userID
      }
      let payload = {
        name: ctx.session.username,
      }
      let token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiresTime })
      ctx.body = {
        success: true,
        data: {
          username: ctx.session.username,
          token
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: 'Please log in'
      }
    }
  }
})

userRouter.post('/register', async ctx => {
  const body = ctx.request.body
  let result;
  if (body.username) {
    result = await findUserByName(body.username)
  }
  if (!result) {
    result = await addUser(body.username, body.password)
    ctx.session = {
      username: body.username,
      userID: result.userID
    }
    ctx.body = {
      username: ctx.session.username
    }
  } else {
    ctx.status = 401
    ctx.body = {
      error: 'user exist'
    }
  }
})

module.exports = userRouter
