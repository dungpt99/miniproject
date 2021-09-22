const { sequelize } = require('../../config/db')
const { DataTypes } = require('sequelize')

const refreshtoken = sequelize.define('refreshtoken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
})

module.exports = refreshtoken
