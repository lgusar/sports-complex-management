import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginDetailModule } from '../login-details/login-detail.module';

@Module({
  imports: [LoginDetailModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
