import { SendNotification } from '@app/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { Module } from '@nestjs/common';
import { CancelNotification } from '@src/app/use-cases/cancel-notifications';
import { CountRecipientNotifications } from '@src/app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@src/app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@src/app/use-cases/read-notification';
import { UnreadNotification } from '@src/app/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
