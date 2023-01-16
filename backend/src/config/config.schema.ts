import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_HOST: Joi.string().required(),
  ETHERSCAN_BASE_URL: Joi.string().required(),
  ETHERSCAN_API_KEY: Joi.string().required(),
});
