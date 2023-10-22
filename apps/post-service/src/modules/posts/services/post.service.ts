import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../repositories/post.repository';
import { ICreatePost, ILikePost } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: IPostRepository) {}

  async createPost(data: ICreatePost): Promise<void> {
    await this.postRepository.createPost(data);
  }

  async likePost(data: ILikePost): Promise<void> {
    await this.postRepository.likePost(data);
  }
}
