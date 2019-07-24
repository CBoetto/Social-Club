const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('Thread', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: {
                args: 5,
                msg: "Posts must be at least 5 characters in length."
            }
        }
    },
    views: {
        type: Sequelize.INTEGER
    },
    postCount: {
        type: Sequelize.INTEGER,
    }
})