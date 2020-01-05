import 'reflect-metadata';
import { Express } from 'express';
import { json, urlencoded } from 'body-parser'
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import {
  createExpressServer,
  useContainer,
  getMetadataArgsStorage,
} from 'routing-controllers';
import Container from 'typedi';
import { serve, setup } from 'swagger-ui-express'

// Controllers
import { BookController } from './src/controllers/BookController';

//configs
import db from './src/configs/db.config.json'

// dbs
import connect from './src/connect';

connect(db)
useContainer(Container);


const routingControllersOptions = {
  controllers: [
    BookController,
  ],
  routePrefix: '/api',
  classTransformer: true,
  validation: true,
  defaultErrorHandler: true,
};

const server: Express = createExpressServer(routingControllersOptions);

const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/'
})

const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http'
      }
    }
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0'
  }
})

server.use(json());
server.use(urlencoded({ extended: true }));

// swagger
server.use('/', serve, setup(spec))

console.log('runing')

server.listen(4321);
