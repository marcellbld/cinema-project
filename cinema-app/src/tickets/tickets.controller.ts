import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserParam } from 'src/auth/user-param.decorator';
import { ScreeningsService } from 'src/screenings/screenings.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(
    private ticketsService: TicketsService,
    private usersService: UsersService,
    private screeningsService: ScreeningsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:sid')
  async findAllByUserAndScreening(
    @Param('id', ParseIntPipe) id: number,
    @Param('sid', ParseIntPipe) screeningId: number,
    @UserParam() ctxUser: UserDto,
  ): Promise<TicketDto[]> {
    if (id !== ctxUser.id) {
      throw new ForbiddenException();
    }
    const user = await this.usersService.findOne(ctxUser.id);

    const screening = await this.screeningsService.findOne(screeningId);
    if (!screening) throw new BadRequestException();

    return (
      await this.ticketsService.findAllByUserAndScreening(user, screening)
    ).map((ticket) => new TicketDto(ticket));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findAllByUser(
    @Param('id', ParseIntPipe) id: number,
    @UserParam() ctxUser: UserDto,
  ): Promise<TicketDto[]> {
    if (id !== ctxUser.id) {
      throw new ForbiddenException();
    }
    const user = await this.usersService.findOne(ctxUser.id);

    return (await this.ticketsService.findAllByUser(user)).map(
      (ticket) => new TicketDto(ticket),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTicketsDto: CreateTicketsDto,
    @UserParam() ctxUser: UserDto,
  ): Promise<TicketDto[]> {
    const user = await this.usersService.findOne(ctxUser.id);
    if (!user) throw new BadRequestException();

    const screening = await this.screeningsService.findOne(
      createTicketsDto.screening.id,
    );
    if (!screening) throw new BadRequestException();

    return (
      await this.ticketsService.create(createTicketsDto, user, screening)
    ).map((ticket) => new TicketDto(ticket));
  }
}
