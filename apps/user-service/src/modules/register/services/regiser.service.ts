import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class RegisterService {
  constructor(private userRepository: IUserRepository) {}

  async registerNewUser(data: any): Promise<void> {
    await this.userRepository.registerNewUser(data);
  }
}
