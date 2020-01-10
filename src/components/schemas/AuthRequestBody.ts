import { IsString } from 'class-validator';

export class AuthRequestBody {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}