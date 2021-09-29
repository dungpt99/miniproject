var express = require('express')
var router = express.Router()
var albumController = require('./album.controller')
var authenToken = require('../auth/auth.middleware')

/**
 * @swagger
 * definitions:
 *   Album:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              required: true
 *          description:
 *              type: string
 *              required: true
 *          status:
 *              type: boolean
 *              required: true
 *   AddPhoto:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *              required: true
 * tags:
 *  name: Album
 *  description: The album managing API
 */

/**
 * @swagger
 *  /album:
 *      post:
 *          summary: Create album
 *          description: Create album
 *          security:
 *              - bearerAuth: []
 *          tags: [Album]
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Album'
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.post('/', authenToken, albumController.create)

/**
 * @swagger
 *  /album/{id}/addPhoto:
 *      post:
 *          summary: Add photo
 *          description: Add photo
 *          tags: [Album]
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the album
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/AddPhoto'
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.post('/:id/addPhoto', albumController.addPhoto)

/**
 * @swagger
 * /album/{id}:
 *      delete:
 *          summary: delete album
 *          tags: [Album]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the album
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.delete('/:id', authenToken, albumController.delete)

/**
 * @swagger
 * /album/{id}:
 *      put:
 *          summary: update album
 *          description: update album
 *          tags: [Album]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of the album
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Album'
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 *
 */
router.put('/:id', authenToken, albumController.edit)

router.param('id', albumController.checkID)
module.exports = router
