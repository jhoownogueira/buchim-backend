import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/user-service/src/infra/database/prisma.service';
import { IUserRepository } from '../user.repository';
import { IUserRegiserDTO } from '../../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { IRestaurantRegisterDTO } from '../../dtos/restaurant.dto';

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
        throw new HttpException('Email already exists', 409);
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

  async registerNewRestaurant(data: IRestaurantRegisterDTO): Promise<void> {
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
        throw new HttpException('Email already exists', 409);
      }

      const location = await this.prisma.location.create({
        data: {
          Street: data.street,
          Number: data.number,
          Neighborhood: data.neighborhood,
          City: data.city,
          Country: data.country,
          ZipCode: data.zipCode,
          State: data.state,
          Latitude: data.latitude,
          Longitude: data.longitude,
        },
      });

      const hashedPassword = await bcrypt.hash(data.password, 10);

      await this.prisma.restaurant.create({
        data: {
          Username: data.username,
          FullName: data.fullName,
          Email: data.email,
          Password: hashedPassword,
          ProfileImageURL: data.profileImageURL,
          AcceptsReservations: false,
          LocationID: location.LocationID,
        },
      });
    });
  }
}
