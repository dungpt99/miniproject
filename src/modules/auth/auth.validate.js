const Joi = require('joi')

const passwordValidate = Joi.object().keys({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeatPassword: Joi.ref('newPassword'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

module.exports = passwordValidate
