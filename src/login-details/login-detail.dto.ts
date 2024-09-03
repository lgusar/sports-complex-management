import { ApiProperty } from '@nestjs/swagger';

export class LoginDetailDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
