import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChatSeenDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;

  @IsBoolean()
  @IsOptional()
  isSeen?: boolean;

  @IsString()
  @IsOptional()
  reaction?: string;
}
