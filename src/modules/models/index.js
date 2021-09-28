const users = require('../users/users.model')
const albums = require('../album/album.model')
const { sequelize } = require('../../config/db')

const useralbums = sequelize.define('useralbum')

users.belongsToMany(albums, { through: useralbums })
albums.belongsToMany(users, { through: useralbums })

module.exports = { users, albums }
