import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'apps/user-service/src/infra/database/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async executeUser(refreshToken: string) {
    const tokenData = await this.prisma.userTokens.findFirst({
      where: {
        Token: refreshToken,
      },
      include: {
        User: true,
      },
    });

    if (!tokenData || tokenData.ExpiresAt <= new Date()) {
      if (tokenData && tokenData.ExpiresAt <= new Date()) {
        const tokenId = await this.prisma.userTokens.findFirst({
          where: {
            Token: refreshToken,
          },
          select: {
            UserID: true,
          },
        });
        if (tokenId) {
          await this.prisma.userTokens.delete({
            where: {
              UserID: tokenId.UserID,
            },
          });
        }
      }

      throw new UnauthorizedException('Refresh Token inválido ou expirado');
    }

    const payload = {
      sub: tokenData.UserID,
      username: tokenData.User.Username,
      full_name: tokenData.User.FullName,
      email: tokenData.User.Email,
      profile_picture: tokenData.User.ProfileImageURL,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async executeRestaurant(refreshToken: string) {
    const tokenData = await this.prisma.restaurantTokens.findFirst({
      where: {
        Token: refreshToken,
      },
      include: {
        Restaurant: true,
      },
    });

    if (!tokenData || tokenData.ExpiresAt <= new Date()) {
      if (tokenData && tokenData.ExpiresAt <= new Date()) {
        const tokenId = await this.prisma.restaurantTokens.findFirst({
          where: {
            Token: refreshToken,
          },
          select: {
            RestaurantID: true,
          },
        });
        if (tokenId) {
          await this.prisma.restaurantTokens.delete({
            where: {
              RestaurantID: tokenId.RestaurantID,
            },
          });
        }
      }

      throw new UnauthorizedException('Refresh Token inválido ou expirado');
    }

    const payload = {
      sub: tokenData.RestaurantID,
      username: tokenData.Restaurant.Username,
      full_name: tokenData.Restaurant.FullName,
      email: tokenData.Restaurant.Email,
      profile_picture: tokenData.Restaurant.ProfileImageURL,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
