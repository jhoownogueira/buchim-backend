import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { PostService } from './services/post.service';
import { IPostRepository } from './repositories/post.repository';
import { PostPrismaRepository } from './repositories/prisma/post.prisma.repository';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    {
      provide: IPostRepository,
      useClass: PostPrismaRepository,
    },
  ],
})
export class PostModule {}
