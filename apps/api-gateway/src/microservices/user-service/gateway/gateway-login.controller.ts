import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface UserSignInDTO {
  username: string;
  password: string;
}

interface RestaurantSignInDTO {
  username: string;
  password: string;
}

interface RefreshTokenDTO {
  refresh_token: string;
}

@Controller('/login')
export class GatewayLoginController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 1701,
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

  @Post('/user/refresh')
  @HttpCode(200)
  async refreshUser(@Body() refreshTokenDTO: RefreshTokenDTO) {
    console.log('Gateway: recebendo requisição de refresh');
    const response = await firstValueFrom(
      this.client.send('user_refresh', refreshTokenDTO),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }

  @Post('/restaurant')
  @HttpCode(200)
  async SignInRestaurant(@Body() signInDTO: RestaurantSignInDTO) {
    console.log('Gateway: recebendo requisição de login');
    const response = await firstValueFrom(
      this.client.send('restaurant_signin', signInDTO),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }

  @Post('/restaurant/refresh')
  @HttpCode(200)
  async refreshRestaurant(@Body() refreshTokenDTO: RefreshTokenDTO) {
    console.log('Gateway: recebendo requisição de refresh');
    const response = await firstValueFrom(
      this.client.send('restaurant_refresh', refreshTokenDTO),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }
}
