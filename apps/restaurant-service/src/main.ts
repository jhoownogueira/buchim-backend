import { NestFactory } from '@nestjs/core';
import { RestaurantServiceModule } from './restaurant-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantServiceModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3002 },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
