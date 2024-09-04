import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDetailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsStrongPassword({ minLength: 10 })
  password: string;
}
