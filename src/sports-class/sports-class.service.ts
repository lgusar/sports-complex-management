import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsClass } from './sports-class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SportsClassService {
  constructor(
    @InjectRepository(SportsClass)
    private readonly classRepository: Repository<SportsClass>,
  ) {}

  async findAll(): Promise<SportsClass[]> {
    return this.classRepository.find();
  }

  async findOne(id: number): Promise<SportsClass> {
    return this.classRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
