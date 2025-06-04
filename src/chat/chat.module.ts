import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
