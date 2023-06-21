import { IsArray, IsOptional, IsString } from 'class-validator';
import { Comment } from '../../comment/entities/comment.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  comments?: Comment[];
}
