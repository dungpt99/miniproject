const { sequelize } = require('../../config/db')
const { DataTypes } = require('sequelize')

const user = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailToken: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = user
