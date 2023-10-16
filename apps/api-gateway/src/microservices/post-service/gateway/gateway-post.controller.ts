import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('/post')
export class GatewayPostController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  })
  private client: ClientProxy;

  @Post('/sua-rota')
  @HttpCode(200)
  async MeuMetodo(@Body() data: any) {
    console.log('Gateway: recebendo requisição na minha rota');
    const response = await firstValueFrom(
      this.client.send('minha_mensagem', data),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }
}
