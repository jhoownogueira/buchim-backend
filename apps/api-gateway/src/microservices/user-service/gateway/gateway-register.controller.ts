import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import { UploadProfilePhotoService } from '../services/upload-profile-photo.service';

@Controller('/register')
export class GatewayRegisterController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 1701,
    },
  })
  private client: ClientProxy;

  constructor(private uploadProfilePhotoService: UploadProfilePhotoService) {}

  @Post('/user')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async RegisterUser(@Body() rawData: any, @UploadedFile() file: any) {
    console.log('Gateway: recebendo requisição de registro');
    const imageUrl = await this.uploadProfilePhotoService.uploadFile(file);
    const data =
      typeof rawData.data === 'string'
        ? JSON.parse(rawData.data)
        : rawData.data;
    data.profileImageURL = imageUrl;
    const response = await firstValueFrom(
      this.client.send('user_register', data),
    );
    if (!response.success) {
      console.log('Erro capturado no gateway:', response);
      throw new HttpException(response.message, response.statusCode);
    }
    return response.data;
  }

  @Post('/restaurant')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async RegisterRestaurant(@Body() rawData: any, @UploadedFile() file: any) {
    console.log('Gateway: recebendo requisição de registro');
    const imageUrl = await this.uploadProfilePhotoService.uploadFile(file);
    const data =
      typeof rawData.data === 'string'
        ? JSON.parse(rawData.data)
        : rawData.data;
    data.profileImageURL = imageUrl;
    data.number = parseInt(data.number);
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    const response = await firstValueFrom(
      this.client.send('restaurant_register', data),
    );
    if (!response.success) {
      console.log('Erro capturado no gateway:', response);
      throw new HttpException(response.message, response.statusCode);
    }
    return response.data;
  }
}
