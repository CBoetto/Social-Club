const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING,
    unique: true
  },
  points: {
    type: Sequelize.INTEGER
  },
})

User.findByLogin = async login => {
    let user = await User.findOne({
        where: { userName: login },
    });

    if (!user) {
        user = await User.findOne({
            where: { email: login },
        })
    }

    return user
}

module.exports = User