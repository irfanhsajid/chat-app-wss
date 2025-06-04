import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
  ) {}

  async createMessage(
    senderId: number,
    receiverId: number,
    content: string,
  ): Promise<Message> {
    const sender = await this.userService.findOne(senderId);
    const receiver = await this.userService.findOne(receiverId);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      content,
      senderId,
      receiverId,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesBetweenUsers(
    user1Id: number,
    user2Id: number,
  ): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .where(
        '(message.senderId = :user1Id AND message.receiverId = :user2Id) OR ' +
          '(message.senderId = :user2Id AND message.receiverId = :user1Id)',
        { user1Id, user2Id },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }
}
