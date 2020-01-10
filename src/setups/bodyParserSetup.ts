import { Express } from 'express';
import { json, urlencoded } from 'body-parser';

export const bodyParserSetup = (server: Express): void => {
  server.use(json({ type: 'application/*+json' }));
  server.use(urlencoded({ extended: true }));
};