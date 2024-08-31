import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SportsClassService } from './sports-class.service';
import { SportsClass } from './sports-class.entity';
import { SportsClassDto } from './sports-class.dto';

@Controller('sports-class')
export class SportsClassController {
  constructor(private readonly classService: SportsClassService) {}

  @Get()
  findAll(): Promise<SportsClass[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SportsClass> {
    return this.classService.findOne(id);
  }

  @Post()
  create(@Body() classDto: SportsClassDto): Promise<SportsClass> {
    throw new NotImplementedException();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() classDto: SportsClassDto,
  ): Promise<SportsClass> {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.classService.remove(id);
    return HttpStatus.NO_CONTENT;
  }
}
