const joi = require('joi')

const createUserSchema = {
    body:joi.object().keys({
        email:joi.string().required(),
        password:joi.string().required(),
        name:joi.string().required()

    })
}

module.exports={createUserSchema}