var express = require('express')
var router = express.Router()
var userController = require('./users.controller')

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: The users managing  API
 */
/**
 * @swagger
 * /users:
 *   get:
 *      summary: Returns list of users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: the list of users
 */
router.get('/', userController.show)

/**
 * @swagger
 * /users:
 *   post:
 *    description: Create new user
 *    tags: [Users]
 *   responses:
 *       200:
 *           description: the new user was created
 */
router.post('/', userController.save)

module.exports = router
