import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../role/role.enum';
import * as bcrypt from 'bcrypt';
import { LoginDetailService } from '../login-details/login-detail.service';
import { LoginDetail } from '../login-details/login-detail.entity';

@Injectable()
export class AuthService {
  constructor(
    private loginDetailService: LoginDetailService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const loginDetail = await this.loginDetailService.findOne(email);
    const hash = await bcrypt.hash(pass, loginDetail.salt);
    if (loginDetail?.passwordHash !== hash) {
      throw new UnauthorizedException();
    }
    return this.createAccessToken(loginDetail);
  }

  async signUp(email: string, pass: string): Promise<{ access_token: string }> {
    const loginDetail = await this.createUserAndLoginDetail(
      email,
      pass,
      Role.User,
    );
    return this.createAccessToken(loginDetail);
  }

  async createUserAndLoginDetail(
    email: string,
    pass: string,
    role: Role,
  ): Promise<LoginDetail> {
    const { hash, salt } = await this.hashAndGenerateSalt(pass);
    const user = await this.usersService.save({});
    const loginDetail: LoginDetail = {
      email: email,
      passwordHash: hash,
      salt: salt,
      // TODO: role shouldn't get hardcoded like this, there is no way to make an admin user
      role: role,
      user: user,
    };
    return this.loginDetailService.save(loginDetail);
  }

  async createAccessToken(
    loginDetail: LoginDetail,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: loginDetail.user.id,
      email: loginDetail.email,
      role: loginDetail.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashAndGenerateSalt(
    password: string,
  ): Promise<{ hash: string; salt: string }> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return {
      hash,
      salt,
    };
  }
}
