import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ChatGroupType } from '../entities/chat-group.entity';

export class CreateChatGroupDto {
  @IsString()
  @IsOptional()
  sid?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(ChatGroupType)
  type: ChatGroupType;

  @IsOptional()
  userIds?: number[];
}
