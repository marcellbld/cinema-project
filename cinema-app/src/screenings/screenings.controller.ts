import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuditoriumsService } from 'src/auditoriums/auditoriums.service';
import { Roles } from 'src/auth/roles';
import { MoviesService } from 'src/movies/movies.service';
import { UserRole } from 'src/users/user-role';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { ScreeningDto } from './dto/screening.dto';
import { ScreeningsService } from './screenings.service';

@Controller('screenings')
export class ScreeningsController {
  constructor(
    private screeningsService: ScreeningsService,
    private moviesService: MoviesService,
    private auditoriumsService: AuditoriumsService,
  ) {}

  @Get()
  async findAll(): Promise<ScreeningDto[]> {
    return (await this.screeningsService.findAll()).map(
      (screening) => new ScreeningDto(screening),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ScreeningDto> {
    return new ScreeningDto(await this.screeningsService.findOne(id));
  }

  @Roles(UserRole.Admin)
  @Post()
  async create(
    @Body() createScreeningDto: CreateScreeningDto,
  ): Promise<ScreeningDto> {
    const movie = await this.moviesService.findOne(createScreeningDto.movie_id);
    if (!movie) {
      throw new BadRequestException();
    }

    const auditorium = await this.auditoriumsService.findOne(
      createScreeningDto.auditorium_id,
    );
    if (!auditorium) {
      throw new BadRequestException();
    }

    return new ScreeningDto(
      await this.screeningsService.create(
        createScreeningDto.startTime,
        auditorium,
        movie,
      ),
    );
  }
}
