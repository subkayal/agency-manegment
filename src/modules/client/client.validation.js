const Joi = require('joi');

module.exports = {
  validateClient: (input) => {
    const schema = Joi.object().keys({
      agencyId: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      totalBill: Joi.number().required(),
      phone: Joi.number().required(),
    });
    return schema.validate(input);
  },
  validateClientUpdate: (input) => {
    const schema = Joi.object().keys({
      clientId: Joi.string().required(),
      agencyId: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      totalBill: Joi.number().required(),
      phone: Joi.number().required(),
    });
    return schema.validate(input);
  },
};
