const Joi = require('joi')

const schemaValidate = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),

    link: Joi.string().min(3).max(200).required(),

    status: Joi.boolean(),
})

module.exports = { schemaValidate }
