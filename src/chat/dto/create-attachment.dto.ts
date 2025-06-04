import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttachmentDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  entityType?: string;

  @IsNumber()
  entityId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsOptional()
  expiredAt?: Date;
}
