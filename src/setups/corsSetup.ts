import { Express } from 'express'
import cors from 'cors'

export const corsSetup = (server: Express): void => {
  let allowCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  };
  server.use(allowCrossDomain);
  server.use(cors())
};
