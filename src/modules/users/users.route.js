var express = require('express')
var router = express.Router()
var userController = require('./users.controller')
var authenToken = require('../auth/auth.middleware')
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
 *components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 * tags:
 *    name: Users
 *    description: The users managing  API
 * User:
 *      type: object
 *      properties:
 *          user_id:
 *              type: integer
 *              description: id of the user
 *              example: 2
 */

/**
 * @swagger
 * /users:
 *   get:
 *      summary: Returns list of users
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: the list of users
 */
router.get('/', userController.show)

/**
 * @swagger
 * /users/{user_id}:
 *      get:
 *          summary: Get user
 *          description: Get user
 *          tags: [Users]
 *          parameters:
 *             - in: path
 *               name: user_id
 *               schema:
 *                    type: integer
 *               required: true
 *               description: id of the user
 *               example: 2
 *          responses:
 *              200:
 *                  description: success
 */
router.get('/:id', userController.find)

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
router.post('/', userController.create)

/**
 * @swagger
 * /users/{id}:
 *      put:
 *          summary: update user
 *          description: update user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: id of the user
 *                example: 2
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/User'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.put('/:id', userController.edit)

/**
 * @swagger
 * /users/{id}:
 *      delete:
 *          summary: delete user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: id of the user
 *                example: 2
 *          responses:
 *              200:
 *                  description: delete user successfully
 */
router.delete('/:id', userController.delete)

router.param('id', userController.checkID)

module.exports = router
