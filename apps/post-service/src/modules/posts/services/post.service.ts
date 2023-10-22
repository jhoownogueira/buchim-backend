import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../repositories/post.repository';
import { ICreatePost } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private userRepository: IPostRepository) {}

  async createPost(data: ICreatePost): Promise<void> {
    await this.userRepository.createPost(data);
  }
}
