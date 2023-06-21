import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsString()
  user_id: string;

  @IsString()
  topic_id: string;
}
