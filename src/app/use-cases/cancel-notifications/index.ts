import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found';

interface CancelNotificationRequestProtocol {
  notificationId: string;
}

type CancelNotificationResponseProtocol = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequestProtocol,
  ): Promise<CancelNotificationResponseProtocol> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
