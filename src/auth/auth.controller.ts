import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDetailDto } from '../login-details/login-detail.dto';
import { Role } from '../role/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDetailDto: LoginDetailDto) {
    return this.authService.signIn(
      loginDetailDto.email,
      loginDetailDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() loginDetailDto: LoginDetailDto) {
    return this.authService.signUp(
      loginDetailDto.email,
      loginDetailDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin')
  async createAdmin(@Body() loginDetailDto: LoginDetailDto) {
    await this.authService.createUserAndLoginDetail(
      loginDetailDto.email,
      loginDetailDto.password,
      Role.Admin,
    );
  }
}
