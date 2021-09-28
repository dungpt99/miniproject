const { sequelize } = require('../../config/db')
const { DataTypes } = require('sequelize')

const album = sequelize.define('album', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = album
