import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterService } from '../services/regiser.service';
import { IUserRegiserDTO } from '../dtos/user.dto';

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
        message: error.response,
        statusCode: error.status,
      };
    }
  }
}
