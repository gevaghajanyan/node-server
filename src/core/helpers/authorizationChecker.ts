import jwt from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { secret_key } from '../../configs/auth.config.json'

export const authorizationChecker = (action: Action, roles: string[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const token = action.request.headers['authorization'];

    if (!token && token.search(/[Bb]earer/) === -1) {
      resolve(false);
    }

    jwt.verify(token.split(' ')[1], secret_key, (error, decoded) => {
      if (error) {
        reject(new Error('123456'));
      }
      if (!decoded) {
        resolve(false);
      }
      if (decoded && decoded.hasOwnProperty('userId')) {
        resolve(true);
      }
    });
  });

};