import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [LoginModule, RegisterModule],
  controllers: [],
  providers: [],
})
export class UserServiceModule {}
