const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('Tag', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})