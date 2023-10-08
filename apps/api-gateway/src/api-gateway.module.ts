import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayLoginController } from './microservices/user-service/gateway/gateway-login.controller';
import { GatewayRegisterController } from './microservices/user-service/gateway/gateway-register.controller';

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
  providers: [],
})
export class ApiGatewayModule {}
