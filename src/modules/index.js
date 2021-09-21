const userRouter = require('./users/users.route')
const albumRouter = require('./album/album.route')
const photoRouter = require('./photo/photo.route')

function route(app) {
    app.use('/users', userRouter)
    app.use('/album', albumRouter)
    app.use('/photo', photoRouter)
}

module.exports = route
