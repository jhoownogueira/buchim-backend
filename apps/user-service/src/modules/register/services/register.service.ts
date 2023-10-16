import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IUserRegiserDTO } from '../dtos/user.dto';
import { IRestaurantRegisterDTO } from '../dtos/restaurant.dto';

@Injectable()
export class RegisterService {
  constructor(private userRepository: IUserRepository) {}

  async registerNewUser(data: IUserRegiserDTO): Promise<void> {
    await this.userRepository.registerNewUser(data);
  }

  async registerNewRestaurant(data: IRestaurantRegisterDTO): Promise<void> {
    await this.userRepository.registerNewRestaurant(data);
  }
}
