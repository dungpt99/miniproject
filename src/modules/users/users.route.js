var express = require('express')
var router = express.Router()
var userController = require('./users.controller')
/**
 * @swagger
 * definitions:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                 type: integer
 *                 example: '1'
 *                 required: true
 *              name:
 *                 type: string
 *                 example: 'a'
 *                 required: true
 *              username:
 *                 type: string
 *                 example: 'a'
 *                 required: true
 *              password:
 *                 type: string
 *                 example: '123'
 *                 required: true
 *              email:
 *                 type: string
 *                 example: 'a@gmail.com'
 *                 required: true
 *              status:
 *                 type: boolean
 *                 example: 'true'
 *                 required: true
 */

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
 *  post:
 *    summary: Create new user
 *    description: Create new user
 *    tags: [Users]
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/User'
 *    responses:
 *       200:
 *          description: user created successfully
 *       500:
 *          description: failure in create user
 */
router.post('/', userController.save)

/**
 * @swagger
 * /users/{id}:
 *      put:
 *          summary: update user
 *          description: update user
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.put('/:id', (req, res) => {
    res.sendStatus(200)
})

/**
 * @swagger
 * /users/{id}:
 *      delete:
 *          summary: delete user
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description:success
 */
router.delete('/:id', (req, res) => {
    res.sendStatus(200)
})

module.exports = router
