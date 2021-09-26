const Joi = require('joi')

const schemaValidate = Joi.object().keys({
    id: Joi.number().max(30).required(),

    name: Joi.string().min(3).max(30).required(),

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [Joi.string(), Joi.number()],

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    status: Joi.boolean(),
})

const passwordValidate = Joi.object().keys({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeatPassword: Joi.ref('newPassword'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

module.exports = { schemaValidate, passwordValidate }
