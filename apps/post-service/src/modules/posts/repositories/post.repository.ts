import { ICreatePost } from '../dtos/post.dto';

export abstract class IPostRepository {
  abstract createPost(data: ICreatePost): Promise<void>;
}
