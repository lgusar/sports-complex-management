import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsClass } from './sports-class/sports-class.entity';
import { SportsClassModule } from './sports-class/sports-class.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'postgres',
      /*
      TODO: USE SECRETS
       */
      password: 'change_this',
      database: 'db',
      entities: [SportsClass, User],
      synchronize: true,
    }),
    SportsClassModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
