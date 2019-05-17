const { User, Deck } = require('./sql')

const findUserByName = function (userName) {
  return User.findOne({
    where: {
      userName
    }
  })
}

const login = function (userName, userPassword) {
  return User.findOne({
    where: {
      userName,
      userPassword
    }
  })
}

const findDecksByUserID = function (userID) {
  return Deck.findAll({
    where: {
      user_id: userID
    }
  })
}

const addUser = function (userName, userPassword) {
  return User.create({
    userName,
    userPassword
  })
}

const addDeck = function (
  card1ID,
  card2ID,
  card3ID,
  card4ID,
  card5ID,
  card6ID,
  card7ID,
  card8ID,
  card1Key,
  card2Key,
  card3Key,
  card4Key,
  card5Key,
  card6Key,
  card7Key,
  card8Key,
  userID
) {
  return Deck.create({
    card1ID,
    card2ID,
    card3ID,
    card4ID,
    card5ID,
    card6ID,
    card7ID,
    card8ID,
    card1Key,
    card2Key,
    card3Key,
    card4Key,
    card5Key,
    card6Key,
    card7Key,
    card8Key,
    userID
  })
}

const deleteDeck = function (deckID) {
  return Deck.destroy({
    where: {
      deckID
    }
  })
}

module.exports = {
  findUserByName,
  login,
  findDecksByUserID,
  addDeck,
  addUser,
  deleteDeck
}
