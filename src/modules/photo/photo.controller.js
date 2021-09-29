const schemaValidate = require('./photo.validate').schemaValidate
const { users, albums, photos, useralbums } = require('../models')

class PhotoController {
    //POST create photo
    async create(req, res) {
        const data = req.body
        try {
            const value = await schemaValidate.validateAsync(data)
            const { name, link, status } = value
            const user = await users.findOne({ where: { email: req.user.email } })
            await photos
                .create({
                    name,
                    link,
                    userId: user.id,
                    status,
                })
                .then(async (photo) => {
                    const result = await photos.findAll({
                        where: {
                            name,
                        },
                        include: users,
                    })
                    res.status(200).json({
                        status: 'Success',
                        data: {
                            result,
                        },
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.send('Create fail')
                })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    //PUT edit photo
    async edit(req, res) {
        const photoId = req.params.id
        const data = req.body
        try {
            const value = await schemaValidate.validateAsync(data)
            const { name, link, status } = value
            await photos
                .update(
                    {
                        name,
                        link,
                        status,
                    },
                    {
                        where: {
                            id: photoId,
                        },
                    }
                )
                .then(async (photo) => {
                    res.status(200).json({
                        status: 'Success',
                        data: {
                            photo,
                        },
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.send('Fail')
                })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    //DELETE photo
    async delete(req, res) {
        const photoId = req.params.id
        await photos
            .destroy({
                where: {
                    id: photoId,
                },
            })
            .then(() => {
                res.status(200).json({
                    status: ' Success',
                    message: 'Delete photo success',
                })
            })
            .catch((err) => {
                console.log(err)
                res.send('Fail')
            })
    }

    //CheckID
    async checkID(req, res, next, val) {
        let array = []
        const data = await photos.findAll({
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
}

module.exports = new PhotoController()
