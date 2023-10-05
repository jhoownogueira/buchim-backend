import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { SignInService } from '../services/sign-in.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { UserSignInDTO } from '../dtos/user.dto';
import { RestaurantSignInDTO } from '../dtos/restaurant.dto';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class LoginController {
  constructor(
    private signInService: SignInService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @MessagePattern('user_signin')
  async SignInUser(signInDTO: UserSignInDTO) {
    try {
      const userTokens = await this.signInService.signInUser(signInDTO);
      return userTokens;
    } catch (error) {
      console.log('Erro no microserviço:', error.response.message);
      return {
        success: false,
        error: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }

  @Post('/restaurant')
  @HttpCode(200)
  async SignInRestaurante(@Body() signInDTO: RestaurantSignInDTO) {
    const userTokens = await this.signInService.signInRestaurant(signInDTO);
    return userTokens;
  }

  @Post('/user/refresh')
  @HttpCode(200)
  async refreshUser(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return await this.refreshTokenService.executeUser(
      refreshTokenDTO.refresh_token,
    );
  }

  @Post('/restaurant/refresh')
  @HttpCode(200)
  async refreshRestaurant(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return await this.refreshTokenService.executeRestaurant(
      refreshTokenDTO.refresh_token,
    );
  }
}
