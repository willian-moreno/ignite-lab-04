import { Notification } from '@app/entities/notification/notification';

export class PrismaNotificationMapper {
  static mappedFields(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.cancel(),
      createdAt: notification.createdAt,
    };
  }
}
