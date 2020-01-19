import { Inject } from 'typedi';
import {
  Body,
  Post,
  JsonController,
} from 'routing-controllers';

import { AuthService } from '../services/AuthService';
import { SuccessHttpResponse } from '../core/classes/HttpSuccess';
import { AuthResponse } from '../components/schemas/AuthResponse';
import { ResponseSchema } from 'routing-controllers-openapi';
import { IUser } from '../types/interfaces/auth';
import { SignInBody } from '../components/schemas/SignInBody';
import { AuthError } from '../errors/AuthError';

@JsonController('/auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('/signIn')
  @ResponseSchema(AuthResponse)
  public async signIn(
    @Body() client: IUser,
  ): Promise<SuccessHttpResponse<AuthResponse>> {
    try {
      const token = await this.authService.signIn(client);
      return new SuccessHttpResponse<AuthResponse>(token);
    } catch ( error ) {
      throw new Error(error)
    }
  }

  @Post('/signUp')
  public async signUp(
    @Body() user: SignInBody,
  ) {
    try {
      console.log(user, 'user-c');
      await this.authService.signUp(user);
      return new SuccessHttpResponse(null);
    } catch ( error) {
      throw new AuthError(error)
    }
  }

}