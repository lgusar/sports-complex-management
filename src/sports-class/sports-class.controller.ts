import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SportsClassService } from './sports-class.service';
import { SportsClass } from './sports-class.entity';
import { SportsClassDto } from './sports-class.dto';

@Controller('classes')
export class SportsClassController {
  constructor(private readonly sportsClassService: SportsClassService) {}

  @Get()
  findAll(): Promise<SportsClass[]> {
    return this.sportsClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SportsClass> {
    return this.sportsClassService.findOne(id);
  }

  @Post()
  create(@Body() sportsClassDto: SportsClassDto): Promise<SportsClass> {
    return this.sportsClassService.create(sportsClassDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() classDto: SportsClassDto,
  ): Promise<SportsClass> {
    return this.sportsClassService.update(id, classDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.sportsClassService.remove(id);
  }
}
