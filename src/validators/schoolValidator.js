const Joi = require('joi');

const schoolSchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  address: Joi.string().required().min(1).max(255),
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180)
});

const locationSchema = Joi.object({
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180)
});

module.exports = {
  schoolSchema,
  locationSchema
};