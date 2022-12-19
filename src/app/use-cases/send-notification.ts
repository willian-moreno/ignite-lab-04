import { Notification } from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/validation/content';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequestProtocol {
  content: string;
  recipientId: string;
  category: string;
}

interface SendNotificationResponseProtocol {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequestProtocol,
  ): Promise<SendNotificationResponseProtocol> {
    const { content, recipientId, category } = request;

    const notification = new Notification({
      content: new Content(content),
      recipientId,
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
