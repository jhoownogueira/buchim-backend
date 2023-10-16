import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterService } from '../services/register.service';
import { IUserRegiserDTO } from '../dtos/user.dto';
import { IRestaurantRegisterDTO } from '../dtos/restaurant.dto';

@Controller()
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @MessagePattern('user_register')
  async RegisterUser(data: IUserRegiserDTO) {
    try {
      await this.registerService.registerNewUser(data);
      return {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        message: error.response ? error.response : error,
        statusCode: error.status ? error.status : 500,
      };
    }
  }

  @MessagePattern('restaurant_register')
  async RegisterRestaurant(data: IRestaurantRegisterDTO) {
    try {
      await this.registerService.registerNewRestaurant(data);
      return {
        success: true,
        message: 'Restaurant registered successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error);
      return {
        success: false,
        message: error.response ? error.response : error,
        statusCode: error.status ? error.status : 500,
      };
    }
  }
}
