const { users, albums } = require('../models')
const validate = require('./users.validate')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

class UserController {
    // GET
    async show(req, res, next) {
        users
            .findAll({
                include: albums,
            })
            .then((users) => {
                res.json(users)
            })
            .catch((err) => console.log(err))
    }

    // GET(by id)
    async find(req, res, next) {
        const id = req.params.id
        try {
            const user = await users.findByPk(id)
            res.status(200).json({
                status: 'Success',
                data: {
                    user: user,
                },
            })
        } catch (error) {
            res.send(error)
        }
    }

    //PUT edit user
    async edit(req, res) {
        const userId = req.params.id
        const data = req.body
        try {
            const value = await validate.schemaValidate.validateAsync(data)
            const { name, username, email, status } = value
            users
                .update(
                    {
                        name,
                        username,
                        email,
                        status,
                    },
                    {
                        where: {
                            id: userId,
                        },
                    }
                )
                .then(() => {
                    res.status(200).json({
                        status: 'Success',
                        message: 'Update user successfully',
                    })
                })
        } catch (error) {
            res.status(400).send(error.details[0].message)
        }
    }

    //Edit password
    async editPassword(req, res) {
        const userId = req.params.id
        const data = req.body
        try {
            const value = await validate.passwordValidate.validateAsync(data)
            const user = await users.findByPk(userId)
            const match = await bcrypt.compare(data.password, user.dataValues.password)
            if (match) {
                const { newPassword } = value
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(newPassword, salt)
                user.password = hashPassword
                await user.save()
                res.status(200).send(user)
            } else {
                res.send('Wrong password')
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error.details[0].message)
        }
    }

    // POST
    async create(req, res, next) {
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
            const value = await validate.schemaValidate.validateAsync(data)
            const { name, username, password, email } = value
            await users
                .create({
                    name: name,
                    username: username,
                    password: password,
                    email: email,
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    status: false,
                })
                .then(async (user) => {
                    console.log('Create user success!')
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(user.password, salt)
                    user.password = hashPassword
                    await user.save()

                    //Send verification mail to user
                    var mailOption = {
                        from: '"Verify your email" <dungpt.ct2@gmail.com>',
                        to: user.email,
                        subject: 'DungPT -verify your email',
                        html: `<h2> ${user.name}! Thanks for your registering on our site </h2>
                                <h4>Please verify your mail to continue...</h4>
                                <a href='http://${req.headers.host}/users/verify-email?token=${user.emailToken}'>Verify your email</a>`,
                    }

                    //Sending mail
                    transporter.sendMail(mailOption, (err, info) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('Verfication email is sent your gmail account')
                        }
                    })
                    res.status(200).send(user)
                })
                .catch((err) => res.send(err))
        } catch (error) {
            res.status(400).send(error)
        }
    }

    //Verify
    async verify(req, res, next) {
        try {
            const token = req.query.token
            const user = await users.findOne({ where: { emailToken: token } })
            if (user != null) {
                user.emailToken = null
                user.status = true
                await user.save()
                res.send(200)
            } else {
                res.send('Email is not verified')
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    //DELETE user
    delete(req, res) {
        const userId = req.params.id
        async function deleteUser() {
            await users.destroy({
                where: {
                    id: userId,
                },
            })
        }
        deleteUser().then(() => {
            res.status(200).json({
                status: 'Success',
                message: 'Delete user successfully',
            })
        })
    }

    //CheckID
    checkID(req, res, next, val) {
        let array = []
        async function selectId() {
            const data = await users.findAll({
                attributes: ['id'],
            })

            data.forEach((e) => array.push(e.dataValues.id))

            if (!array.includes(val)) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Invalid ID',
                })
            }
            next()
        }
        selectId()
    }
}

module.exports = new UserController()
