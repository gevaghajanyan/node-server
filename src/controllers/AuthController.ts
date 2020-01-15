import { Inject } from 'typedi';
import {
  Controller,
  Body,
  Post,
  ContentType,
} from 'routing-controllers';

import { AuthService } from '../services/AuthService';
import { ErrorHttpResponse, SuccessHttpResponse } from '../core/classes/HttpSuccess';
import { AuthRequestBody } from '../components/schemas/AuthRequestBody';
import { AuthResponse } from '../components/schemas/AuthResponse';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller('/auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('/signIn')
  @ContentType('application/json')
  @ResponseSchema(AuthResponse)
  public async signIn(
    @Body() client: AuthRequestBody,
  ): Promise<SuccessHttpResponse<AuthResponse>> {
    try {
      const token = await this.authService.signIn(client);
      return new SuccessHttpResponse<AuthResponse>(token);
    } catch ( e ) {
      return new ErrorHttpResponse(e.message)
    }
  }

  @Post('/signUp')
  @ContentType('application/json')
  public async signUp(
    @Body() user: AuthRequestBody,
  ) {
    try {
      const token = await this.authService.signUp(user);
      return new SuccessHttpResponse(token);
    } catch ( e ) {
      return new ErrorHttpResponse(e.message)
    }
  }

}