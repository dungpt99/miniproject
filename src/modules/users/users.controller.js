const users = require('./users.model')
const schemaValidate = require('./users.validate')

class UserController {
    // GET
    show(req, res, next) {
        users
            .findAll()
            .then((users) => {
                res.json(users)
            })
            .catch((err) => console.log(err))
    }

    // GET(by id)
    find(req, res, next) {
        const id = req.params.id
        async function findUser() {
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
        findUser()
    }

    //PUT edit user
    edit(req, res) {
        const userId = req.params.id
        const data = req.body
        async function saveValue() {
            try {
                const value = await schemaValidate.validateAsync(data)
                const { id, name, username, password, email, status } = value
                users
                    .update(
                        {
                            id,
                            name,
                            username,
                            password,
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
        saveValue()
    }

    // POST
    create(req, res, next) {
        const data = req.body
        async function saveValue() {
            try {
                const value = await schemaValidate.validateAsync(data)
                const { id, name, username, password, email, status } = value
                users
                    .create({
                        id: id,
                        name: name,
                        username: username,
                        password: password,
                        email: email,
                        status: status,
                    })
                    .then((user) => {
                        console.log('Create user success!')
                        res.status(200).send(user)
                    })
                    .catch((err) => res.send(err))
            } catch (error) {
                res.status(400).send(error.details[0].message)
            }
        }
        saveValue()
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

            if (!array.includes(Number(val))) {
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
