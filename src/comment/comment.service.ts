import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from 'src/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}
  createComment(comment: IComment) {
    try {
      const newComment = this.commentRepo.save(comment);
      return newComment;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAllComments() {
    try {
      const comments = this.commentRepo.find();
      return comments;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneComment(id: string) {
    try {
      const comment = this.commentRepo.findOne({
        where: {
          id: id,
        },
      });
      return comment;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  updateComment(id: string, updatedComment: IComment) {
    try {
      const updatedCommentFromDb = this.commentRepo.update(id, updatedComment);
      return updatedCommentFromDb;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  removeComment(id: string) {
    try {
      const deletedComment = this.findOneComment(id);
      this.commentRepo.delete(id);
      return deletedComment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
