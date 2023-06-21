import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepo.save(createUserDto);
      return newUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAllUsers() {
    try {
      const users = this.userRepo.find();
      return users;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneUser(id: string) {
    try {
      const user = this.userRepo.findOne({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = this.userRepo.update(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  removeUser(id: string) {
    try {
      const deletedUser = this.findOneUser(id);
      this.userRepo.delete(id);
      return deletedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
