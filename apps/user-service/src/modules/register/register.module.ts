import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { IUserRepository } from '../register/repositories/user.repository';
import { UserPrismaRepository } from '../register/repositories/prisma/user.prisma.repository';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/regiser.service';

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class RegisterModule {}
