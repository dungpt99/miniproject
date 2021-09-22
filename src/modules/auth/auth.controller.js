const jwt = require('jsonwebtoken')
const refreshtokens = require('./auth.model')
const users = require('../users/users.model')

class AuthController {
    //Login
    login(req, res, next) {
        const data = req.body
        async function user() {
            const user = await users.findAll({
                where: {
                    username: data.username,
                    password: data.password,
                },
            })
            if (user.length != 0) {
                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
                refreshtokens.create({
                    id: refreshToken,
                })
                res.json({ accessToken, refreshToken })
            } else {
                res.send('Login failed.')
            }
        }
        user()
    }

    //Logout
    logout(req, res, next) {
        const refreshToken = req.body.token
        refreshtokens.destroy({
            where: {
                id: refreshToken,
            },
        })
        res.send(200)
    }

    //Refresh Token
    refresh(req, res, next) {
        const refreshToken = req.body.token
        if (!refreshtokens) res.sendStatus(401)
        if (
            !refreshtokens.findAll({
                where: {
                    id: refreshToken,
                },
            })
        ) {
            res.sendStatus(403)
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(403)
            const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s',
            })
            res.json({ accessToken })
        })
    }
}

module.exports = new AuthController()
