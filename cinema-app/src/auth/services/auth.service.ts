import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/users/dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import { AuthHelperService } from './auth-helper/auth-helper.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authHelperService: AuthHelperService,
  ) {}

  async login(user: any): Promise<LoginResponseDto> {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (
      user &&
      (await this.authHelperService.comparePassword(password, user.password))
    ) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
}
