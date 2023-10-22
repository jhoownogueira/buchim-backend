import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../post.repository';
import { PrismaService } from 'apps/post-service/src/infra/database/prisma.service';
import { ICreatePost, ILikePost } from '../../dtos/post.dto';

@Injectable()
export class PostPrismaRepository implements IPostRepository {
  constructor(private prisma: PrismaService) {}

  async createPost(data: ICreatePost): Promise<void> {
    await this.prisma.post.create({
      data: {
        RestaurantID: data.restaurantID,
        Content: data.content,
        ImageURL: data.imageURL,
      },
    });
  }

  async likePost(data: ILikePost): Promise<void> {
    await this.prisma.like.create({
      data: {
        UserID: data.userID,
        PostID: data.postID,
      },
    });
  }
}
