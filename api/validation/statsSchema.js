const Joi = require('joi');

const statsQuerySchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
  dimensionFilters: Joi.object().pattern(
    Joi.string().valid('country', 'deviceType', 'route'),
    Joi.string()
  ).optional()
});

module.exports = { statsQuerySchema };
