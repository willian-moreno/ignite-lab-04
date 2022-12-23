import { CancelNotification } from '@app/use-cases/cancel-notifications';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import {
  NotificationViewModel,
  NotificationViewModelProtocol,
} from '@infra/http/view-models/notification-view-model';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CountRecipientNotifications } from '@src/app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@src/app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@src/app/use-cases/read-notification';
import { UnreadNotification } from '@src/app/use-cases/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationViewModelProtocol[] }> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    const notificationsToHTTP = notifications.map(NotificationViewModel.toHTTP);

    return {
      notifications: notificationsToHTTP,
    };
  }

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<{ notification: NotificationViewModelProtocol }> {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({ notificationId: id });
  }
}
