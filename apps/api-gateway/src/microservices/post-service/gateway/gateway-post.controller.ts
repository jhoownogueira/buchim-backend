import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UploadPostPhotoService } from '../services/upload-post-photo.service';
import { FileInterceptor } from '@nestjs/platform-express';

interface ICreatePost {
  restaurantID: string;
  content: string;
  imageURL: string;
}
interface ILikePost {
  userID: string;
  postID: string;
}

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

  constructor(private uploadPostPhotoService: UploadPostPhotoService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async CreatePost(@Body() data: ICreatePost, @UploadedFile() file: any) {
    console.log(file);
    console.log(data);
    console.log('Gateway: recebendo requisição de registro');
    const imageUrl = await this.uploadPostPhotoService.uploadFile(file);
    data.imageURL = imageUrl;
    const response = await firstValueFrom(
      this.client.send('create-post', data),
    );
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }

  @Post('/like')
  @HttpCode(201)
  async LikePost(@Body() data: ILikePost) {
    console.log('Gateway: recebendo requisição de like');
    const response = await firstValueFrom(this.client.send('like-post', data));
    if (!response.success) {
      console.log(response);
      console.log('Erro capturado no gateway:', response.error);
      throw new HttpException(response.error, response.statusCode);
    }
    return response.data;
  }
}
