import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginDetailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Length(10)
  password: string;
}
