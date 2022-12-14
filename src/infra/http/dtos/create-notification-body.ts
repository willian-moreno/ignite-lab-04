import { IsNotEmpty, IsUUID, Length } from '@nestjs/class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 50)
  category: string;

  @IsNotEmpty()
  @Length(5, 255)
  content: string;
}
