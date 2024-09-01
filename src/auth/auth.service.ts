import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Role } from '../role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    // TODO: implement password hashing
    const hash = pass;
    if (user?.passwordHash !== hash) {
      throw new UnauthorizedException();
    }
    return this.createAccessToken(user);
  }

  async signUp(email: string, pass: string): Promise<{ access_token: string }> {
    let user: User = {
      email: email,
      // TODO: implement password hashing
      passwordHash: pass,
      salt: pass,
      role: Role.User,
    };
    user = await this.usersService.save(user);
    return this.createAccessToken(user);
  }

  async createAccessToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
