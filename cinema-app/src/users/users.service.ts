import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { AuthHelperService } from 'src/auth/services/auth-helper/auth-helper.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: EntityRepository<User>,
    private authHelperService: AuthHelperService,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async update(userDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findOne(userDto.id);
    user.fullName = userDto.fullName || user.fullName;
    user.phone = userDto.phone || user.phone;

    await this.usersRepository.persistAndFlush(user);

    return user;
  }

  async create(userDto: UserDto): Promise<User> {
    userDto.password = await this.authHelperService.hashPassword(
      userDto.password,
    );
    const user = this.usersRepository.create(userDto);

    await this.usersRepository.persistAndFlush(user);

    return user;
  }
}
