import { Controller, Body } from '@nestjs/common';
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
      console.log('Microserviço: recebendo requisição de login');
      const userTokens = await this.signInService.signInUser(signInDTO);
      console.log('Microserviço: enviando resposta de login');
      return {
        success: true,
        statusCode: 200,
        data: userTokens,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        error: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }

  @MessagePattern('restaurant_signin')
  async SignInRestaurante(@Body() signInDTO: RestaurantSignInDTO) {
    try {
      console.log('Microserviço: recebendo requisição de login');
      const userTokens = await this.signInService.signInRestaurant(signInDTO);
      console.log('Microserviço: enviando resposta de login');
      return {
        success: true,
        statusCode: 200,
        data: userTokens,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        error: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }

  @MessagePattern('user_refresh')
  async refreshUser(@Body() refreshTokenDTO: RefreshTokenDTO) {
    try {
      console.log('Microserviço: recebendo requisição de refresh');
      const newToken = await this.refreshTokenService.executeUser(
        refreshTokenDTO.refresh_token,
      );
      console.log('Microserviço: enviando resposta de refresh');
      return {
        success: true,
        statusCode: 200,
        data: newToken,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        error: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }

  @MessagePattern('restaurant_refresh')
  async refreshRestaurant(@Body() refreshTokenDTO: RefreshTokenDTO) {
    try {
      console.log('Microserviço: recebendo requisição de refresh');
      const newToken = await this.refreshTokenService.executeRestaurant(
        refreshTokenDTO.refresh_token,
      );
      console.log('Microserviço: enviando resposta de refresh');
      return {
        success: true,
        statusCode: 200,
        data: newToken,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        error: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }
}
