const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize(
    `postgres://evgfqelsjwscix:d98a7b28494b7d7901f06b067cd7907f72752c64da2bd3af69dfe12a8dc5533e@ec2-54-227-251-33.compute-1.amazonaws.com:5432/d50jqpnm6n55h3`,
{
        logging: false
    }
)
module.exports = db

// `postgres://evgfqelsjwscix:d98a7b28494b7d7901f06b067cd7907f72752c64da2bd3af69dfe12a8dc5533e@ec2-54-227-251-33.compute-1.amazonaws.com:5432/d50jqpnm6n55h3`,
// `postgres://localhost:5432/socialclub`,
