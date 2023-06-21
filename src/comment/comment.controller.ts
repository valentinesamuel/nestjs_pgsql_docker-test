import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserService } from 'src/user/user.service';
import { TopicService } from 'src/topic/topic.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
  ) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const { text, topic_id, user_id } = createCommentDto;
    const user = await this.userService.findOneUser(user_id);
    const topic = await this.topicService.findOneTopic(topic_id);
    return this.commentService.createComment({ text, user, topic });
  }

  @Get()
  findAll() {
    return this.commentService.findAllComments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOneComment(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { text, topic_id, user_id } = updateCommentDto;
    const user = await this.userService.findOneUser(user_id);
    const topic = await this.topicService.findOneTopic(topic_id);
    return this.commentService.updateComment(id, { id, text, topic, user });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.removeComment(id);
  }
}
