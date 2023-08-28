const Joi = require("joi");

const schemaContact = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email" }),
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone" }),
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required favorite" }),
});
const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = {
  schemaContact,
  contactUpdateFavoriteSchema,
};
