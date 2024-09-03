import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
