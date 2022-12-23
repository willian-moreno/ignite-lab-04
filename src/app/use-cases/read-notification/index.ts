import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found';

interface ReadNotificationRequestProtocol {
  notificationId: string;
}

type ReadNotificationResponseProtocol = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequestProtocol,
  ): Promise<ReadNotificationResponseProtocol> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
