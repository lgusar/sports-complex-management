import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDetail } from './login-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginDetailService {
  constructor(
    @InjectRepository(LoginDetail)
    private readonly loginDetailRepository: Repository<LoginDetail>,
  ) {}

  async findOne(email: string): Promise<LoginDetail> {
    return await this.loginDetailRepository.findOneBy({ email });
  }

  async save(loginDetail: LoginDetail): Promise<LoginDetail> {
    return await this.loginDetailRepository.save(loginDetail);
  }
}
