const users = require('../users/users.model')
const albums = require('../album/album.model')
const photos = require('../photo/photo.model')
const { sequelize } = require('../../config/db')

const useralbums = sequelize.define('useralbum')

users.belongsToMany(albums, { through: useralbums })
albums.belongsToMany(users, { through: useralbums })

users.hasMany(photos)
photos.belongsTo(users)

albums.hasMany(photos)
photos.belongsTo(albums)

module.exports = { users, albums, photos, useralbums }
