import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsString()
  user_id: string;

  @IsString()
  topic_id: string;
}
