const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test', 'postgres', 'neklmgm', {
    host: 'localhost',
    dialect: 'postgres',
})

async function testConnect() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = { sequelize, testConnect }
