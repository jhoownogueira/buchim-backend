import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../post.repository';
import { PrismaService } from 'apps/post-service/src/infra/database/prisma.service';
import { ICreatePost, IFollowRestaurant, ILikePost } from '../../dtos/post.dto';

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
    const postLiked = await this.prisma.like.findFirst({
      where: {
        UserID: data.userID,
        PostID: data.postID,
      },
    });

    if (postLiked) {
      await this.prisma.like.delete({
        where: {
          LikeID: postLiked.LikeID,
        },
      });
    } else {
      await this.prisma.like.create({
        data: {
          UserID: data.userID,
          PostID: data.postID,
        },
      });
    }
  }

  async switchFollowRestaurant(data: IFollowRestaurant): Promise<void> {
    const restaurantFollowed =
      await this.prisma.userFollowsRestaurant.findFirst({
        where: {
          UserID: data.userID,
          RestaurantID: data.restaurantID,
        },
      });

    if (restaurantFollowed) {
      await this.prisma.userFollowsRestaurant.delete({
        where: {
          FollowID: restaurantFollowed.FollowID,
        },
      });
    } else {
      await this.prisma.userFollowsRestaurant.create({
        data: {
          UserID: data.userID,
          RestaurantID: data.restaurantID,
        },
      });
    }
  }

  async listPostsByUserFollowRestaurants(userID: string): Promise<any> {
    const posts = await this.prisma.post.findMany({
      where: {
        Restaurant: {
          UserFollowsRestaurant: {
            some: {
              UserID: userID,
            },
          },
        },
      },
      include: {
        Likes: true,
        Restaurant: true,
        Comments: {
          include: {
            User: true,
          },
        },
      },
    });

    const postsWithLikedMe = posts.map((post) => {
      const likedMe = post.Likes.some((like) => like.UserID === userID);
      return { ...post, liked_me: likedMe };
    });

    return postsWithLikedMe.map((post) => {
      return {
        postID: post.PostID,
        content: post.Content,
        imageURL: post.ImageURL,
        createdAt: Date,
        likedMe: post.liked_me,
        restaurant: {
          id: post.RestaurantID,
          username: post.Restaurant.Username,
          photoURL: post.Restaurant.ProfileImageURL,
        },
        comments: post.Comments.map((comment) => {
          return {
            id: comment.CommentID,
            image: comment.ImageURL,
            createdAt: comment.CreatedAt,
            user: {
              id: comment.User.UserID,
              username: comment.User.Username,
              photoURL: comment.User.ProfileImageURL,
            },
          };
        }),
      };
    });
  }
}
