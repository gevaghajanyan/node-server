import 'reflect-metadata';
import Container from 'typedi';
import { Express } from 'express';
import { createExpressServer, useContainer } from 'routing-controllers';

import { controllers } from './src/controllers';
import { authorizationChecker } from './src/core/helpers/authorizationChecker';
import { bodyParserSetup } from './src/setups/bodyParserSetup';
import { swaggerSetup } from './src/setups/swaggerSetup';
import './src/connections/mongoDb.conection';

useContainer(Container);

const routingControllersOptions = {
  controllers,
  routePrefix: '/api',
  classTransformer: true,
  validation: true,
  defaultErrorHandler: true,
  authorizationChecker,
};

const server: Express = createExpressServer(routingControllersOptions);

/**
 * setups
 */
bodyParserSetup(server);
swaggerSetup(server, {
  routingControllersOptions,
});

console.log('runing');
server.listen(4321);
