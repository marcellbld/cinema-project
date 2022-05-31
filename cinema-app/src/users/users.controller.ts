import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { UserParam } from 'src/auth/user-param.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @UserParam() ctxUser: UserDto,
  ): Promise<UserDto> {
    if (ctxUser.id !== id) {
      throw new ForbiddenException();
    }
    return new UserDto(await this.usersService.findOne(id));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    return new UserDto(await this.usersService.create(userDto));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() userDto: UserDto,
    @UserParam() ctxUser: UserDto,
  ): Promise<UserDto> {
    if (ctxUser.id !== userDto.id) {
      throw new ForbiddenException();
    }
    return new UserDto(await this.usersService.update(userDto));
  }
}
