const users = require('./users.model')

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
        try {
            const { id, name, username, password, email, status } = req.body
            users
                .create({
                    id: id,
                    name: name,
                    username: username,
                    password: password,
                    email: email,
                    status: status,
                })
                .then(() => console.log('Create user success!'))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(err)
        }
    }
}

module.exports = new UserController()
