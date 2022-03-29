const Joi = require("joi");
const search_model_schema = Joi.object({
  model: Joi.string().required(),
  site: Joi.string(),
});

const create_site_schema = Joi.object({
  site_name: Joi.string().required(),
  url: Joi.string().required(),
  proxy: Joi.number(),
});

const delete_site_schema = Joi.object({
  site_name: Joi.string().required(),
});


const create_model_schema = Joi.object({
  name: Joi.string().required(),
});

const delete_model_schema = Joi.object({
  name: Joi.string().required()
});
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

module.exports = {
  search_model_schema,
  create_site_schema,
  delete_site_schema,
  create_model_schema,
  delete_model_schema,
  options
};
