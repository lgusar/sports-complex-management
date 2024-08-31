import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsClass } from './sports-class.entity';
import { SportsClassService } from './sports-class.service';
import { SportsClassController } from './sports-class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SportsClass])],
  providers: [SportsClassService],
  controllers: [SportsClassController],
})
export class SportsClassModule {}
