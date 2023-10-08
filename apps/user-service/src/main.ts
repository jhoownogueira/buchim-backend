import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
