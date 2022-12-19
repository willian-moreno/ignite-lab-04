import { Notification } from '../../../app/entities/notification/notification';
export class NotificationViewModel {
  static toHTTP(notification: Notification): object {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
    };
  }
}
