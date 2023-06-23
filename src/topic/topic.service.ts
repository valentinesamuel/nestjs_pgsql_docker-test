import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
  ) {}
  createTopic(createTopicDto: CreateTopicDto) {
    try {
      const newTopic = this.topicRepo.save(createTopicDto);
      return newTopic;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAllTopics() {
    try {
      const topics = this.topicRepo.find();
      return topics;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneTopic(id: string) {
    try {
      const topic = this.topicRepo.findOne({
        where: {
          id: id,
        },
        relations: {
          comments: true,
        },
      });
      return topic;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      const updatedTopic = this.topicRepo.update(id, updateTopicDto);
      return updatedTopic;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  removeTopic(id: string) {
    try {
      const deletedTopic = this.findOneTopic(id);
      this.topicRepo.delete(id);
      return deletedTopic;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
