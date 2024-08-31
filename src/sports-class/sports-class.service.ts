import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsClass } from './sports-class.entity';
import { Repository } from 'typeorm';
import { SportsClassDto } from './sports-class.dto';

@Injectable()
export class SportsClassService {
  constructor(
    @InjectRepository(SportsClass)
    private readonly sportsClassRepository: Repository<SportsClass>,
  ) {}

  async findAll(): Promise<SportsClass[]> {
    return this.sportsClassRepository.find();
  }

  async findOne(id: number): Promise<SportsClass> {
    return this.sportsClassRepository.findOneBy({ id });
  }

  async create(sportsClassDto: SportsClassDto): Promise<SportsClass> {
    return this.sportsClassRepository.save(sportsClassDto);
  }

  async update(
    id: number,
    sportsClassDto: SportsClassDto,
  ): Promise<SportsClass> {
    const exists = this.sportsClassRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException();
    }

    await this.sportsClassRepository.update(id, sportsClassDto);
    return this.sportsClassRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.sportsClassRepository.delete(id);
  }
}
