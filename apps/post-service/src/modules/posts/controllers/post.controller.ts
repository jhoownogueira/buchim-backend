import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from '../services/post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @MessagePattern('minha_mensagem')
  async RegisterPost(data: any) {
    console.log(data);
    return 'Hello Word';
    // await this.postService.create(data);
  }
}
