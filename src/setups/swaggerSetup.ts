import { Express } from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { serve, setup } from 'swagger-ui-express';

import { getSwaggerAdditionalOptions } from '../core/helpers/swaggerHelpers';

export const swaggerSetup = (server: Express, options: any = {}): void => {
  const { routingControllersOptions } = options;
  const metadata = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  const schemas = validationMetadatasToSchemas(metadata, {
    refPointerPrefix: '#/components/schemas/'
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllersOptions, getSwaggerAdditionalOptions(schemas));
  server.use('/', serve, setup(spec));
};