import { Notification } from '@src/app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  constructor(public notifications: Notification[] = []) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification =
      this.notifications.find(({ id }) => id === notificationId) || null;

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications =
      this.notifications.filter(
        (notification) => notification.recipientId === recipientId,
      ) || [];

    return notifications;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    const index = this.notifications.findIndex(
      ({ id }) => id === notification.id,
    );

    if (index >= 0) this.notifications[index] = notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count =
      this.notifications.filter(
        (notification) => notification.recipientId === recipientId,
      ) || 0;

    return count.length;
  }
}
