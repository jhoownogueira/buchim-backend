import { ICreatePost, ILikePost } from '../dtos/post.dto';

export abstract class IPostRepository {
  abstract createPost(data: ICreatePost): Promise<void>;
  abstract likePost(data: ILikePost): Promise<void>;
}
