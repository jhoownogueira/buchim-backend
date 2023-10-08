import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export type UserSignInDTO = {
  username: string;
  password: string;
};

@Controller('/login')
export class GatewayLoginController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  })
  private client: ClientProxy;

  @Post('/user')
  @HttpCode(200)
  async SignInUser(@Body() signInDTO: UserSignInDTO) {
    console.log('Gateway: recebendo requisição de login');
    const response = await firstValueFrom(
      this.client.send('user_signin', signInDTO),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }
}
