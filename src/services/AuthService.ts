import jwt from 'jsonwebtoken';

import { AuthResponse } from '../components/schemas/AuthResponse';
import { secret_key } from '../configs/auth.config.json';
import { getHash } from '../core/helpers/hash';
import { UserModel } from '../models/UserModel';
import { User } from '../core/classes/User';
import { IUser } from '../types/interfaces/auth';

export class AuthService {
  public signIn(client: IUser): Promise<AuthResponse> {
    const { email, password } = client;
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: email.toLowerCase() }).then((user: any) => {
        if (user && user.password === getHash(password)) {
          jwt.sign({
              id: user._id,
              userName: user.userName,
            },
            secret_key,
            { expiresIn: '7d' },
            (error, token) => {
              if (error) {
                reject(error);
              }
              resolve({ token });
            });
        } else {
          reject('error 1');
        }
      });
    });
  }

  public signUp(data: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: data.email }).then((user: any) => {
        if (user) {
          reject('invalidUserName');
          return;
        }
        try {
          const userModel = new UserModel(User.createUser(data));
          userModel.save((err, product) => {
            if (err) {
              reject(err);
            }
            resolve(product);
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}