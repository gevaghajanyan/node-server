import { OpenAPIObject } from 'openapi3-ts/src/model/OpenApi';

import swaggerConfig from '../../configs/swagger.config.json';

export const getSwaggerAdditionalOptions = (schemas): OpenAPIObject => {
  swaggerConfig.components.schemas = schemas;
  return Object(swaggerConfig);
};