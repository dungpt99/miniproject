const userRouter = require('./users/users.route')
const albumRouter = require('./album/album.route')
const photoRouter = require('./photo/photo.route')
const authRouter = require('./auth/auth.route')

function route(app) {
    app.use('/', authRouter)
    app.use('/users', userRouter)
    app.use('/album', albumRouter)
    app.use('/photo', photoRouter)
}

module.exports = route
