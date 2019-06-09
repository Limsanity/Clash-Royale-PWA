const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const apiRouter = new Router({ prefix: '/api' })
const jwtSecret = 'jwtSecret'

const {
  findDecksByUserID,
  addDeck,
  deleteDeck
} = require('../utils/query')

apiRouter.get('/deck', async ctx => {
  if (ctx.session && ctx.session.userID) {
    const userID = ctx.session.userID
    let result = await findDecksByUserID(userID)
    ctx.body = {
      success: true,
      data: result
    }
  } else {
    ctx.body = {
      success: false,
      data: 'please log in'
    }
  }
})

apiRouter.post('/deck', async ctx => {
  const token = ctx.headers.authorization
  try {
    jwt.verify(token.split(' ')[1], jwtSecret)
    const userID = ctx.session.userID
    const body = ctx.request.body
    const arg = []
    body.forEach(item => {
      arg.push(item.id)
    })
    body.forEach(item => {
      arg.push(item.key)
    })
    const result = await addDeck(...arg, userID)
    ctx.body = {
      success: true,
      deckID: result.deckID,
      data: 'add deck successfully'
    }
  } catch (e) {
    ctx.body = {
      success: false,
      data: 'please log in'
    }
  }
})

apiRouter.delete('/deck/:id', async ctx => {
  if (ctx.session && ctx.session.username) {
    const deckID = ctx.params.id
    await deleteDeck(deckID)
    ctx.body = {
      success: true,
      data: 'delete successfully'
    }
  }
})

module.exports = apiRouter
