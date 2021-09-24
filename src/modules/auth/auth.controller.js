const jwt = require('jsonwebtoken')
const refreshtokens = require('./auth.model')
const users = require('../users/users.model')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

class AuthController {
    //Login
    async login(req, res, next) {
        const data = req.body
        const user = await users.findOne({
            where: {
                email: data.email,
            },
        })
        if (user.length != 0) {
            const match = await bcrypt.compare(data.password, user.dataValues.password)
            if (match) {
                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
                refreshtokens.create({
                    id: refreshToken,
                })
                res.json({ accessToken, refreshToken })
            }
        } else {
            res.send('Login failed.')
        }
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
