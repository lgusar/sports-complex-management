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
  UseGuards,
} from '@nestjs/common';
import { SportsClassService } from './sports-class.service';
import { SportsClass } from './sports-class.entity';
import { SportsClassDto } from './sports-class.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/roles.guard';

@Controller('classes')
@UseGuards(AuthGuard)
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
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  create(@Body() sportsClassDto: SportsClassDto): Promise<SportsClass> {
    return this.sportsClassService.create(sportsClassDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  update(
    @Param('id') id: number,
    @Body() classDto: SportsClassDto,
  ): Promise<SportsClass> {
    return this.sportsClassService.update(id, classDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.sportsClassService.remove(id);
  }
}
