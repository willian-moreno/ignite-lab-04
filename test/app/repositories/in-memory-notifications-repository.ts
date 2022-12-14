import { Notification } from '#/app/entities/notification/notification';
import { NotificationsRepository } from '#/app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  constructor(public notifications: Notification[] = []) {}

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
