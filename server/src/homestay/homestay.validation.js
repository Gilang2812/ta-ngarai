const Joi = require('joi');

const homestaySchema = Joi.object({
    name:Joi.string().required(),
    address: Joi.string().required(),
    open: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    close: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    geom: Joi.required(),
})



module.exports = {homestaySchema};