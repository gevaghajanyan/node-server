import jwt from 'jsonwebtoken';

import { AuthRequestBody } from '../components/schemas/AuthRequestBody';
import { AuthResponse } from '../components/schemas/AuthResponse';
import { secret_key } from '../configs/auth.config.json';
import { getHash } from '../core/helpers/hash';
import { UserModel } from '../models/UserModel';

export class AuthService {
  public signIn(client: AuthRequestBody): Promise<AuthResponse> {

    const { userName, password } = client;

    return new Promise((resolve, reject) => {
      UserModel.findOne({ userName }).then((user: any) => {
        console.log(user, 'user', getHash(password), user.password === getHash(password));
        if (user && user.password === getHash(password)) {
          jwt.sign({
              id: user._id,
              userName: user.userName
            },
            secret_key,
            { expiresIn: '7d' },
            (error, token) => {
              if (error) {
                reject(error);
              }
              resolve({ token });
            })
        } else {
          reject('error 1')
        }
      });
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