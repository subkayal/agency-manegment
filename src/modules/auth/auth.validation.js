const Joi = require('joi');

module.exports = {
  validateRegister: (input) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }).required(),
      password: Joi.string().min(8).max(16).required(),
    });
    return schema.validate(input);
  },
  validateLogin: (input) => {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(input);
  },
};
