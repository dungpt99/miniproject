const { users, albums, photos } = require('../models')
const schemaValidate = require('./album.validate')
const jwt = require('jsonwebtoken')

class AlbumController {
    //PUT edit album
    async edit(req, res) {
        const albumId = req.params.id
        const data = req.body
        try {
            const value = await schemaValidate.validateAsync(data)
            const { name, description, status } = value
            await albums
                .update(
                    {
                        name,
                        description,
                        status,
                    },
                    {
                        where: {
                            id: albumId,
                        },
                    }
                )
                .then(async (album) => {
                    res.status(200).json({
                        status: 'Success',
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.send('Update album fail')
                })
        } catch (error) {
            res.send(error)
        }
    }

    //POST
    async create(req, res) {
        const data = req.body
        try {
            const value = await schemaValidate.validateAsync(data)
            const { name, description, status } = value
            const user = await users.findOne({
                where: {
                    email: req.user.email,
                },
            })
            await albums
                .create({
                    name,
                    description,
                    status,
                })
                .then(async (album) => {
                    album.addUsers(user)
                    const result = await albums.findOne({
                        where: {
                            name,
                        },
                        include: users,
                    })
                    res.status(200).json({
                        status: 'success',
                        data: {
                            result,
                        },
                    })
                })
                .catch((err) => {
                    res.send(err)
                })
        } catch (error) {
            res.send(error)
        }
    }

    //DELETE
    async delete(req, res) {
        const albumId = req.params.id
        try {
            await albums
                .destroy({
                    where: {
                        id: albumId,
                    },
                })
                .then(() => {
                    res.send('Delete album successfully')
                })
                .catch((err) => {
                    console.log(err)
                    res.send('Delete fail')
                })
        } catch (error) {
            console.log(error)
            res.send('Delete fail')
        }
    }

    //ADD photo
    async addPhoto(req, res) {
        const albumId = req.params.id
        const photoId = req.body.id
        try {
            await photos
                .update(
                    {
                        albumId,
                    },
                    {
                        where: {
                            id: photoId,
                        },
                    }
                )
                .then((photo) => {
                    res.status(200).json({
                        status: 'Success',
                        data: {
                            photo,
                        },
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        } catch (error) {
            res.send(error)
        }
    }

    //CheckID
    checkID(req, res, next, val) {
        let array = []
        async function selectId() {
            const data = await albums.findAll({
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

module.exports = new AlbumController()
