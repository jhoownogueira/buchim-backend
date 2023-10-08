import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/user-service/src/infra/database/prisma.service';
import { IUserRepository } from '../user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async registerNewUser(data: any): Promise<void> {
    await this.prisma.$transaction(async () => {
      const userUsernameExists = await this.prisma.user.findUnique({
        where: {
          Username: data.Username,
        },
      });
      const restaurantUsernameExists = await this.prisma.restaurant.findUnique({
        where: {
          Username: data.Username,
        },
      });
      if (userUsernameExists || restaurantUsernameExists) {
        throw new HttpException('Username already exists', 409);
      }

      const userEmailExists = await this.prisma.user.findUnique({
        where: {
          Email: data.Email,
        },
      });
      const restaurantEmailExists = await this.prisma.restaurant.findUnique({
        where: {
          Email: data.Email,
        },
      });

      if (userEmailExists || restaurantEmailExists) {
        throw new HttpException('Username already exists', 409);
      }

      await this.prisma.user.create({
        data,
      });
    });
  }

  async registerNewRestaurant(data: any): Promise<void> {
    await this.prisma.$transaction(async () => {
      const userUsernameExists = await this.prisma.user.findUnique({
        where: {
          Username: data.Username,
        },
      });
      const restaurantUsernameExists = await this.prisma.restaurant.findUnique({
        where: {
          Username: data.Username,
        },
      });
      if (userUsernameExists || restaurantUsernameExists) {
        throw new HttpException('Username already exists', 409);
      }

      const userEmailExists = await this.prisma.user.findUnique({
        where: {
          Email: data.Email,
        },
      });
      const restaurantEmailExists = await this.prisma.restaurant.findUnique({
        where: {
          Email: data.Email,
        },
      });

      if (userEmailExists || restaurantEmailExists) {
        throw new HttpException('Username already exists', 409);
      }

      await this.prisma.restaurant.create({
        data,
      });
    });
  }
}
