import { Module } from '@nestjs/common';
import { UserGatewayModule } from './user-service/user-gateway.module';
import { PostGatewayModule } from './post-service/post-gateway.module';

@Module({
  imports: [UserGatewayModule, PostGatewayModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
