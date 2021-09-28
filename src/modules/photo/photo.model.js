const { sequelize } = require('../../config/db')
const { DataTypes } = require('sequelize')

const photo = sequelize.define('photo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userid: {
        type: DataTypes.UUID,
    },
    albumid: {
        type: DataTypes.UUID,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = photo
