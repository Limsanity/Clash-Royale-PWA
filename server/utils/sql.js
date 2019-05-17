const Sequelize = require('sequelize')
const sequelize = require('../config/mysql_config')

const User = sequelize.define('user', {
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id'
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'user_name'
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'user_password'
  }
}, {
  freezeTableName: true
})

const Deck = sequelize.define('deck', {
  deckID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'deck_id'
  },
  card1ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card1_id'
  },
  card2ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card2_id'
  },
  card3ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card3_id'
  },
  card4ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card4_id'
  },
  card5ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card5_id'
  },
  card6ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card6_id'
  },
  card7ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card7_id'
  },
  card8ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'card8_id'
  },
  card1Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card1_key'
  },
  card2Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card2_key'
  },
  card3Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card3_key'
  },
  card4Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card4_key'
  },
  card5Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card5_key'
  },
  card6Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card6_key'
  },
  card7Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card7_key'
  },
  card8Key: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'card8_key'
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'user_id'
  }
}, {
  freezeTableName: true
})

Deck.belongsTo(User, {foreignKey: 'user_id'})

module.exports = {
  User,
  Deck
}
