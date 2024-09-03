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
  Query,
  Req,
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
  find(@Query() query: any): Promise<SportsClass[]> {
    if (query.sports === undefined) {
      return this.sportsClassService.findAll();
    }
    const filter = query.sports.split(',');
    return this.sportsClassService.findSome(filter);
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
  remove(@Param('id') id: number) {
    return this.sportsClassService.remove(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  apply(@Param('id') id: number, @Req() request: any): Promise<SportsClass> {
    return this.sportsClassService.apply(id, request.user.sub);
  }
}
