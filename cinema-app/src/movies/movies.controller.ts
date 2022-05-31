import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  //TODO only admin
  @Post()
  async create(@Body() movieDto: MovieDto): Promise<MovieDto> {
    return new MovieDto(await this.moviesService.create(movieDto));
  }

  @Get()
  async findAll(): Promise<MovieDto[]> {
    return (await this.moviesService.findAll()).map(
      (movie) => new MovieDto(movie),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovieDto> {
    return new MovieDto(await this.moviesService.findOne(id));
  }

  @Get('categories/:id')
  async findAllByCategory(
    @Param('id') categoryId: number,
  ): Promise<MovieDto[]> {
    return (await this.moviesService.findAllByCategory(categoryId)).map(
      (movie) => new MovieDto(movie),
    );
  }
}
