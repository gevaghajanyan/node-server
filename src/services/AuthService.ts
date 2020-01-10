import jwt from 'jsonwebtoken';

import { AuthRequestBody } from '../components/schemas/AuthRequestBody';
import { AuthResponse } from '../components/schemas/AuthResponse';
import { secret_key } from '../configs/auth.config.json';
import { getHash } from '../core/helpers/hash';
import { UserModel } from '../models/UserModel';
import { error } from 'winston';

export class AuthService {
  public signIn(data: AuthRequestBody): Promise<AuthResponse> {

    const payload = { 'userId': 'b08f86af-35da-48f2-8fab-cef3904660bd' }; // get mongoDb

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret_key, {
        expiresIn: '7d'
      }, (error, token) => {
        if (error) {
          reject(error);
        }
        resolve({
          token,
        })
      })
    })
  }

  public signUp(data: AuthRequestBody): Promise<any> {
    return new Promise((resolve, reject) => {

      data.password = getHash(data.password);
      const userModel = new UserModel(data);
      userModel.save((err, product) => {
        if (err) {
          console.log(err, 'errr');
          reject(err);
        }
        console.log(product, 'product');
        resolve(product)
      })
    })
  }
}