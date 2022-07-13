const Joi = require('joi')

const validateField = (fields)=>{
    const validateSchema = Joi.object({
        email:Joi.string().min(8).max(32).required(),
        password:Joi.string().min(6).max(24).required()
    })
    const {error,value} = validateSchema.validate(fields)
    return {error,value}
}

module.exports = {validateField}