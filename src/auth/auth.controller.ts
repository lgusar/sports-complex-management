import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDetailDto } from '../login-details/login-detail.dto';
import { Role } from '../role/role.enum';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  // TODO: seed database with an admin user
  @HttpCode(HttpStatus.OK)
  @Post('admin')
  async createAdmin(@Body() loginDetailDto: LoginDetailDto) {
    await this.authService.createUserAndLoginDetail(
      loginDetailDto.email,
      loginDetailDto.password,
      Role.Admin,
    );
  }

  @Delete('/user/:id')
  async delete(@Param() id: number) {
    await this.userService.delete({ id });
  }
}
