import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  constructor(public notifications: Notification[] = []) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error(notificationId);
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    throw new Error(notification.id);
  }
}
