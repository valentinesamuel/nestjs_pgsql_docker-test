import { IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  comments: [];
}
