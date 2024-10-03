const Joi = require('joi');

const loginScheme = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
});

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().custom((value, helper) => {
        const domain = value.split('@')[1];
        if (domain !== 'gmail.com') {
            return helper.message('Please enter a valid email address with Gmail domain.');
        }
        return value;
    }),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    })
});

module.exports = {
    registerSchema,
    loginScheme
};
