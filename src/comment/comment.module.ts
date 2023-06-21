import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserService } from 'src/user/user.service';
import { TopicService } from 'src/topic/topic.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Topic } from 'src/topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Topic])],
  controllers: [CommentController],
  providers: [UserService, CommentService, TopicService],
})
export class CommentModule {}
