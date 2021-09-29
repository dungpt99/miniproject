const jwt = require('jsonwebtoken')
const refreshtokens = require('./auth.model')
const users = require('../users/users.model')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const passwordValidate = require('./auth.validate')
const nodemailer = require('nodemailer')

class AuthController {
    //Login
    async login(req, res, next) {
        const data = req.body
        if (!data.username) {
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
                    res.status(200).json({ accessToken, refreshToken })
                }
            } else {
                res.send('Login failed.')
            }
        } else {
            const user = await users.findOne({
                where: {
                    username: data.username,
                },
            })
            if (user.length != 0 && user.status == true) {
                const match = await bcrypt.compare(data.password, user.dataValues.password)
                if (match) {
                    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
                    refreshtokens.create({
                        id: refreshToken,
                    })
                    res.status(200).json({ accessToken, refreshToken })
                } else {
                    res.send('Wrong password')
                }
            } else {
                res.send('Your account is not verified')
            }
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
            const accessToken = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s',
            })
            res.json({ accessToken })
        })
    }

    //Forgot password
    async forgotPassword(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dungpt.ct2@gmail.com',
                pass: 'Neklmgm123',
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        const data = req.body
        try {
            const value = await passwordValidate.validateAsync(data)
            const { email, newPassword } = value
            await users.findOne({ where: { email: email } }).then(async (user) => {
                //Send verification mail to user
                var mailOption = {
                    from: '"Verify your email" <dungpt.ct2@gmail.com>',
                    to: user.email,
                    subject: 'DungPT -Create new password',
                    html: `<h2> ${user.name}! Create new password </h2>
                        <a href='http://${req.headers.host}/verify-account?email=${user.email}&newPass=${newPassword}'>Create new password</a>`,
                }
                //Sending mail
                transporter.sendMail(mailOption, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Message is sent your gmail account')
                    }
                })
                res.status(200).send(user)
            })
        } catch (error) {
            res.status(400).send(error.details[0].message)
        }
    }

    //Verify_account
    async verifyAccount(req, res, next) {
        try {
            const { email, newPass } = req.query
            console.log(typeof newPass)
            await users
                .findOne({ where: { email: email } })
                .then(async (user) => {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(newPass, salt)
                    user.password = hashPassword
                    await user.save()
                    res.status(200).send('New password created')
                })
                .catch((err) => {
                    res.send('New password is not created')
                })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = new AuthController()
