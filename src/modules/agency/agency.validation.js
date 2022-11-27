const Joi = require('joi');

module.exports = {
  validateAgency: (input) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().allow(''),
      state: Joi.string().required(),
      city: Joi.string().required(),
      phone: Joi.number().required(),
    });
    return schema.validate(input);
  },
  validateClient: (input) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      totalBill: Joi.number().required(),
      phone: Joi.number().required(),
    });
    return schema.validate(input);
  },
};
