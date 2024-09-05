import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDetailDto } from '../login-details/login-detail.dto';
import { Role } from '../role/role.enum';
import { UserService } from '../user/user.service';
import { AuthGuard } from './auth.guard';

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

  @HttpCode(HttpStatus.OK)
  @Post('admin')
  async createAdmin(@Body() loginDetailDto: LoginDetailDto) {
    await this.authService.createUserAndLoginDetail(
      loginDetailDto.email,
      loginDetailDto.password,
      Role.Admin,
    );
  }

  // TODO: new custom guard for deleting users, both admin and the user can delete a user
  @Delete('/user/:id')
  @UseGuards(AuthGuard)
  async delete(@Param() id: number) {
    await this.userService.delete({ id });
  }
}
