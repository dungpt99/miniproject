const Joi = require('joi')

const schemaValidate = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: [Joi.string(), Joi.number()],
    status: Joi.boolean(),
})

module.exports = schemaValidate
