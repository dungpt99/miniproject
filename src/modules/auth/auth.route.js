var express = require('express')
var router = express.Router()
var AuthController = require('./auth.controller')

/**
 * @swagger
 * definitions:
 *      Login:
 *          type: object
 *          properties:
 *              username:
 *                 type: string
 *                 example: 'a'
 *                 required: true
 *              password:
 *                 type: string
 *                 example: '123'
 *                 required: true
 *      Logout:
 *          type: object
 *          properties:
 *              token:
 *                 type: string
 *                 required: true
 *      RefreshToken:
 *          type: object
 *          properties:
 *              token:
 *                 type: string
 *                 required: true
 *components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 * tags:
 *    name: Login
 *    description: The login managing  API
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login
 *    description: Login
 *    tags: [Login]
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/Login'
 *    responses:
 *       200:
 *          description: login successfully
 *       500:
 *          description: Failure in login
 */
router.post('/login', AuthController.login)

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: Logout
 *    description: Logout
 *    tags: [Login]
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/Logout'
 *    responses:
 *       200:
 *          description: Logout successfully
 *       500:
 *          description: Failure in Logout
 */
router.post('/logout', AuthController.logout)

/**
 * @swagger
 * /refreshToken:
 *  post:
 *    summary: refreshToken
 *    description: refreshToken
 *    tags: [Login]
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/RefreshToken'
 *    responses:
 *       200:
 *          description: RefreshToken successfully
 *       500:
 *          description: Failure in refreshToken
 */
router.post('/refreshToken', AuthController.refresh)

module.exports = router
