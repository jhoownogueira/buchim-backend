import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterService } from '../services/regiser.service';

@Controller()
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @MessagePattern('user_regiser')
  async RegisterUser(data: any) {
    try {
      await this.registerService.registerNewUser(data);
      return {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.log('Erro no microserviço:', error.response.message);
      return {
        success: false,
        message: error.response.message,
        statusCode: error.response.statusCode,
      };
    }
  }
}
