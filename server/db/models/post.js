const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('Post', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: {
                args: 5,
                msg: "Posts must be at least 5 characters in length."
            }
        }
    }
})