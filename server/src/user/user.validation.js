const Joi = require('joi');

const adminSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().custom((value, helper) => {
        const domain = value.split('@')[1];
        if (domain !== 'gmail.com') {
            return helper.message('Please enter a valid email address with Gmail domain.');
        }
        return value;
    }),
})

module.exports = {adminSchema};