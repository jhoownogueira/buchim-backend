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
        RefreshToken: refreshToken,
      },
      include: {
        User: true,
      },
    });

    if (!tokenData || tokenData.ExpiresIn <= new Date()) {
      if (tokenData && tokenData.ExpiresIn <= new Date()) {
        const tokenId = await this.prisma.userTokens.findFirst({
          where: {
            RefreshToken: refreshToken,
          },
          select: {
            RefreshTokenID: true,
          },
        });
        if (tokenId) {
          await this.prisma.userTokens.delete({
            where: {
              RefreshTokenID: tokenId.RefreshTokenID,
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
        RefreshToken: refreshToken,
      },
      include: {
        Restaurant: true,
      },
    });

    if (!tokenData || tokenData.ExpiresIn <= new Date()) {
      if (tokenData && tokenData.ExpiresIn <= new Date()) {
        const tokenId = await this.prisma.restaurantTokens.findFirst({
          where: {
            RefreshToken: refreshToken,
          },
          select: {
            RefreshTokenID: true,
          },
        });
        if (tokenId) {
          await this.prisma.userTokens.delete({
            where: {
              RefreshTokenID: tokenId.RefreshTokenID,
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
