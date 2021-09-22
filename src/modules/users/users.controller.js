const users = require('./users.model')
const schemaValidate = require('./users.validate')

class UserController {
    show(req, res, next) {
        users
            .findAll()
            .then((users) => {
                res.json(users)
            })
            .catch((err) => console.log(err))
    }

    //Save
    save(req, res, next) {
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
                    .then(() => {
                        console.log('Create user success!')
                        res.send(200)
                    })
                    .catch((err) => console.log(err))
            } catch (error) {
                res.send(error.details[0].message)
            }
        }
        saveValue()
    }
}

module.exports = new UserController()
