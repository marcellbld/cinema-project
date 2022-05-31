import { Controller, Get } from '@nestjs/common';
import { AuditoriumsService } from './auditoriums.service';
import { AuditoriumDto } from './dto/auditorium.dto';

@Controller('auditoriums')
export class AuditoriumsController {
  constructor(private auditoriumsService: AuditoriumsService) {}

  @Get()
  async findAll(): Promise<AuditoriumDto[]> {
    return (await this.auditoriumsService.findAll()).map(
      (aud) => new AuditoriumDto(aud),
    );
  }
}
