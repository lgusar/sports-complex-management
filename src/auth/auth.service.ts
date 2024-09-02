import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Role } from '../role/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    const hash = await bcrypt.hash(pass, user.salt);

    if (user?.passwordHash !== hash) {
      throw new UnauthorizedException();
    }
    return this.createAccessToken(user);
  }

  async signUp(email: string, pass: string): Promise<{ access_token: string }> {
    const { hash, salt } = await this.hashAndGenerateSalt(pass);
    let user: User = {
      email: email,
      passwordHash: hash,
      salt: salt,
      // TODO: role shouldn't get hardcoded like this, there is no way to make an admin user
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
