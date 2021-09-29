const { sequelize } = require('../../config/db')
const { DataTypes } = require('sequelize')

const photos = sequelize.define('photos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
    },
    albumId: {
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

module.exports = photos
