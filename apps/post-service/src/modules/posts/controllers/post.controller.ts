import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from '../services/post.service';
import { ICreatePost } from '../dtos/post.dto';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @MessagePattern('create-post')
  async RegisterPost(data: ICreatePost) {
    try {
      await this.postService.createPost(data);
      return {
        success: true,
        message: 'Post registered successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        message: error.response ? error.response : error,
        statusCode: error.status ? error.status : 500,
      };
    }
  }
}
