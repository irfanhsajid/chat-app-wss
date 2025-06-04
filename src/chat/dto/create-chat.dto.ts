import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  chatGroupId: number;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  senderType?: string;

  @IsNumber()
  senderId: number;
}
