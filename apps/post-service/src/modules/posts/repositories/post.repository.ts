import {
  ICreatePost,
  IFollowRestaurant,
  ILikePost,
  IRestaurantList,
} from '../dtos/post.dto';

export abstract class IPostRepository {
  abstract createPost(data: ICreatePost): Promise<void>;
  abstract likePost(data: ILikePost): Promise<void>;
  abstract switchFollowRestaurant(data: IFollowRestaurant): Promise<void>;
  abstract listPostsByUserFollowRestaurants(userID: string): Promise<any>;
  abstract listAllRestaurants(): Promise<IRestaurantList[]>;
}
