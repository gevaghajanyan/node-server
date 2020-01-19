import { Express } from 'express'
import { ErrorHttpResponse } from '../core/classes/HttpSuccess';

export const errorSetup = (server: Express) => {
  server.use((error, req, res, next) => {
    if (error) {
      res.status(500).send(new ErrorHttpResponse([ error.message ]))
    } else {
      next();
    }
  })
};