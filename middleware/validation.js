const Joi = require('joi');

//register validation
const registerValidation = data => {
    const schema = Joi.object({
        id: Joi.number().required().max(8),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        avatar: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const updateValidation = data => {
    const schema = Joi.object({
        id: Joi.number().required().max(8),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        avatar: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;