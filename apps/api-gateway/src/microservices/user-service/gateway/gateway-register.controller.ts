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

@Controller('/register')
export class GatewayRegisterController {
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
  async RegisterUser(@Body() data: any) {
    const response = await firstValueFrom(
      this.client.send('user_register', data),
    );
    if (!response.success) {
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }
}
