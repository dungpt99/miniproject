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
 *      editUser:
 *          type: object
 *          properties:
 *              name:
 *                 type: string
 *                 example: 'a'
 *                 required: true
 *      resetPassword:
 *          type: object
 *          properties:
 *              password:
 *                  type: string
 *                  require: true
 *              newPassword:
 *                  type: string
 *                  require: true
 *              repeatPassword:
 *                  type: string
 *                  require: true
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
 * 

 *          
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
router.get('/', authenToken, userController.show)

router.get('/verify-email', userController.verify)
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
 *                    type: string
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
 * /users/{id}/resetPassword:
 *      put:
 *          summary: update password
 *          description: update password
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the user
 *                example: 2
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/resetPassword'
 *          responses:
 *              200:
 *                  description: success
 */
router.put('/:id/resetPassword', userController.editPassword)

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
 *                  type: string
 *                required: true
 *                description: id of the user
 *                example: 2
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/editUser'
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
 *                  type: string
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
