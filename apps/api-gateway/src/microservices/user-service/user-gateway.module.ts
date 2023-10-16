import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayLoginController } from './gateway/gateway-login.controller';
import { GatewayRegisterController } from './gateway/gateway-register.controller';
import { UploadProfilePhotoService } from './services/upload-profile-photo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [GatewayLoginController, GatewayRegisterController],
  providers: [UploadProfilePhotoService],
})
export class UserGatewayModule {}
