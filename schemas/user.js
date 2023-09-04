const Joi = require("joi");

const { regexpEmail } = require("../constants/user-contacts");

const userSignupSchame = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regexpEmail).required(),
  subscription: Joi.string(),
});

const userSigninSchame = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regexpEmail).required(),
});

module.exports = {
  userSignupSchame,
  userSigninSchame,
};
