import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { SignInService } from './services/sign-in.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { PrismaService } from '../../infra/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInService, RefreshTokenService, PrismaService],
})
export class LoginModule {}
