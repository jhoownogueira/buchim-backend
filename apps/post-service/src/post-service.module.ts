import { Module } from '@nestjs/common';
import { PostModule } from './modules/posts/post.module';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [],
})
export class PostServiceModule {}
