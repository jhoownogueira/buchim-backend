import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from '../services/post.service';
import { ICreatePost, IFollowRestaurant, ILikePost } from '../dtos/post.dto';

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

  @MessagePattern('like-post')
  async LikePost(data: ILikePost) {
    try {
      await this.postService.likePost(data);
      return {
        success: true,
        message: 'Like registered successfully',
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

  @MessagePattern('follow-restaurant')
  async FollowRestaurant(data: IFollowRestaurant) {
    try {
      await this.postService.switchFollowRestaurant(data);
      return {
        success: true,
        message: 'Follow registered successfully',
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

  @MessagePattern('list-posts-by-user-follow-restaurants')
  async ListPostByUserFollowRestaurants(userID: string) {
    try {
      const posts =
        await this.postService.listPostsByUserFollowRestaurants(userID);
      return {
        success: true,
        data: posts,
        message: 'Ok',
        statusCode: 200,
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

  @MessagePattern('list-all-restaurants')
  async ListAllRestaurants() {
    try {
      const restaurants = await this.postService.listAllRestaurants();
      return {
        success: true,
        data: restaurants,
        message: 'Ok',
        statusCode: 200,
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
