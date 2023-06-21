import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, email: string, userPassword: string) {
    const autheduser = await this.userService.findOneUser(name);
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    if (autheduser && autheduser.password !== hashedPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: autheduser.name,
      name: autheduser.name,
      email: autheduser.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: autheduser.name,
      email: autheduser.email,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
