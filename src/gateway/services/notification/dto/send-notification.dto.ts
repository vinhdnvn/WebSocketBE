import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class SendNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  targetUserId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
