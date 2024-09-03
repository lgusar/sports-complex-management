import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginDetail } from './login-detail.entity';
import { LoginDetailService } from './login-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginDetail])],
  providers: [LoginDetailService],
  exports: [LoginDetailService],
})
export class LoginDetailModule {}
