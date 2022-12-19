import { Module } from '@nestjs/common';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { SendNotification } from '@app/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
