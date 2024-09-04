import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SportsClassDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  weekSchedule: string;
  @ApiProperty()
  @IsString()
  classDuration: string;
  @ApiProperty()
  @IsString()
  description: string;
}
