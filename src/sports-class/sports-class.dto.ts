import { ApiProperty } from '@nestjs/swagger';

export class SportsClassDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  weekSchedule: string;
  @ApiProperty()
  classDuration: string;
  @ApiProperty()
  description: string;
}
