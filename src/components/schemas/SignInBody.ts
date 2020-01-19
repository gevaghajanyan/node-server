import { IsString } from 'class-validator';

export class SignInBody {
  @IsString({
    message: 'INVALID_EMAIL'
  })
  email: string;
  @IsString({
    message: 'INVALID_PASSWORD'
  })
  password: string;

  @IsString({
    message: 'INVALID_FIRST_NAME'
  })
  firstName: string;

  @IsString({
    message: 'INVALID_LAST_NAME'
  })
  lastName: string;
}