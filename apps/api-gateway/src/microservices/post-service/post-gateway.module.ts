import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayPostController } from './gateway/gateway-post.controller';
import { UploadPostPhotoService } from './services/upload-post-photo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 1702,
        },
      },
    ]),
  ],
  controllers: [GatewayPostController],
  providers: [UploadPostPhotoService],
})
export class PostGatewayModule {}
