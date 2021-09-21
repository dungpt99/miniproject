const userRouter = require('./users/users.route')
const albumRouter = require('./album/album.route')
const photo = require('./photo/photo.route')

function route(app) {
    app.use('/users', userRouter)
    app.use('/album', albumRouter)
    app.use('/photo', photo)
}

module.exports = route
