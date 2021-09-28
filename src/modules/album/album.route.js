var express = require('express')
var router = express.Router()
var albumController = require('./album.controller')

router.post('/', albumController.create)
router.delete('/:id', albumController.delete)
router.put('/:id', albumController.edit)

router.param('id', albumController.checkID)
module.exports = router
