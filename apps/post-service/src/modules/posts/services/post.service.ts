import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../repositories/post.repository';

@Injectable()
export class PostService {
  constructor(private userRepository: IPostRepository) {}

  async create(data: any): Promise<void> {
    await this.userRepository.create(data);
  }
}
