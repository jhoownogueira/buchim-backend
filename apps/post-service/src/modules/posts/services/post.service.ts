import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../repositories/post.repository';
import {
  ICreatePost,
  IFollowRestaurant,
  ILikePost,
  IRestaurantList,
} from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: IPostRepository) {}

  async createPost(data: ICreatePost): Promise<void> {
    await this.postRepository.createPost(data);
  }

  async likePost(data: ILikePost): Promise<void> {
    await this.postRepository.likePost(data);
  }

  async switchFollowRestaurant(data: IFollowRestaurant): Promise<void> {
    await this.postRepository.switchFollowRestaurant(data);
  }

  async listPostsByUserFollowRestaurants(userID: string): Promise<any> {
    return await this.postRepository.listPostsByUserFollowRestaurants(userID);
  }

  async listAllRestaurants(): Promise<IRestaurantList[]> {
    return await this.postRepository.listAllRestaurants();
  }
}
