var express = require('express')
var router = express.Router()
var photoController = require('./photo.controller')
var authenToken = require('../auth/auth.middleware')
/**
 * @swagger
 * definitions:
 *  Photo:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: 'DaLat'
 *              required: true
 *          link:
 *              type: string
 *              required: true
 *          status:
 *              type: boolean
 *              required: true
 * tags:
 *  name: Photo
 *  description: The photos managing API
 */
/**
 * @swagger
 *  /photo:
 *      post:
 *          summary: Create photo
 *          description: Create photo
 *          tags: [Photo]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Photo'
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.post('/', authenToken, photoController.create)

/**
 * @swagger
 *  /photo/{id}:
 *      put:
 *          summary: update photo
 *          description: update photo
 *          tags: [Photo]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                require: true
 *                description: id of the photo
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Photo'
 *          response:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.put('/:id', authenToken, photoController.edit)

/**
 * @swagger
 *  /photo/{id}:
 *      delete:
 *          summary: Delete photo
 *          description: Delete photo
 *          tags: [Photo]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id of photo
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Fail
 */
router.delete('/:id', authenToken, photoController.delete)
router.param('id', photoController.checkID)
module.exports = router
