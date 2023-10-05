import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from 'apps/user-service/src/infra/database/prisma.service';
import { UserSignInDTO } from '../dtos/user.dto';
import { RestaurantSignInDTO } from '../dtos/restaurant.dto';

function generateRefreshToken(): string {
  return crypto.randomBytes(24).toString('hex');
}

@Injectable()
export class SignInService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async signInUser(data: UserSignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        Username: data.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario incorreto');
    }

    const isEqualPassword = await compare(data.password, user.Password);

    if (!isEqualPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      sub: user.UserID,
      username: user.Username,
      full_name: user.FullName,
      email: user.Email,
      profile_picture: user.ProfileImageURL,
    };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = generateRefreshToken();

    await this.prisma.userTokens.deleteMany({
      where: {
        UserID: user.UserID,
      },
    });

    await this.prisma.userTokens.create({
      data: {
        UserID: user.UserID,
        RefreshToken: refreshToken,
        ExpiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: token,
      refreshToken: refreshToken,
    };
  }

  async signInRestaurant(data: RestaurantSignInDTO) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        Username: data.username,
      },
    });

    if (!restaurant) {
      throw new UnauthorizedException('Usuario incorreto');
    }

    const isEqualPassword = await compare(data.password, restaurant.Password);

    if (!isEqualPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      sub: restaurant.RestaurantID,
      username: restaurant.Username,
      full_name: restaurant.FullName,
      email: restaurant.Email,
      profile_picture: restaurant.ProfileImageURL,
    };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = generateRefreshToken();

    await this.prisma.restaurantTokens.deleteMany({
      where: {
        RestaurantID: restaurant.RestaurantID,
      },
    });

    await this.prisma.restaurantTokens.create({
      data: {
        RestaurantID: restaurant.RestaurantID,
        RefreshToken: refreshToken,
        ExpiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: token,
      refreshToken: refreshToken,
    };
  }
}
