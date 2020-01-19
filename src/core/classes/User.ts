import { getHash } from '../helpers/hash';
import { IUser } from '../../types/interfaces/auth';
import { IsString } from 'class-validator';

export class User {
  public role?: string = null;
  @IsString()
  public email: string = null;
  @IsString()
  public password: string = null;
  @IsString()
  public firstName: string = null;
  @IsString()
  public lastName: string = null;

  constructor(
    email,
    password,
    firstName,
    lastName,
  ) {
    this.email = email;
    this.password = getHash(password);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createUser(data: IUser) {
    if (!data.hasOwnProperty('email')) {
      throw new Error('Invalid email');
    }
    if (!data.hasOwnProperty('password')) {
      throw new Error('Invalid Password');
    }

    if (!data.hasOwnProperty('firstName')) {
      throw new Error('Invalid FirstName');
    }
    if (!data.hasOwnProperty('lastName')) {
      throw new Error('Invalid LastName');
    }

    const {
      email,
      password,
      lastName,
      firstName,
    } = data;

    return new User(email, password, lastName, firstName);
  }

}