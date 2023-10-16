import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PostServiceModule } from './post-service.module';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(PostServiceModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3002 },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
