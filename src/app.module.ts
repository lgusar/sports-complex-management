import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsClass } from './sports-class/sports-class.entity';
import { SportsClassModule } from './sports-class/sports-class.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoginDetail } from './login-details/login-detail.entity';
import { LoginDetailModule } from './login-details/login-detail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: 'db',
      entities: [SportsClass, User, LoginDetail],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    SportsClassModule,
    AuthModule,
    LoginDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
