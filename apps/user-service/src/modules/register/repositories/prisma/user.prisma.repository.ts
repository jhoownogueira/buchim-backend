import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/user-service/src/infra/database/prisma.service';
import { IUserRepository } from '../user.repository';
import { IUserRegiserDTO } from '../../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async registerNewUser(data: IUserRegiserDTO): Promise<void> {
    await this.prisma.$transaction(async () => {
      const userUsernameExists = await this.prisma.user.findUnique({
        where: {
          Username: data.username,
        },
      });
      const restaurantUsernameExists = await this.prisma.restaurant.findUnique({
        where: {
          Username: data.username,
        },
      });
      if (userUsernameExists || restaurantUsernameExists) {
        throw new HttpException('Username already exists', 409);
      }

      const userEmailExists = await this.prisma.user.findUnique({
        where: {
          Email: data.email,
        },
      });
      const restaurantEmailExists = await this.prisma.restaurant.findUnique({
        where: {
          Email: data.email,
        },
      });

      if (userEmailExists || restaurantEmailExists) {
        throw new HttpException('Username already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      await this.prisma.user.create({
        data: {
          Username: data.username,
          FullName: data.fullName,
          Email: data.email,
          Password: hashedPassword,
          ProfileImageURL: data.profileImageURL,
        },
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
