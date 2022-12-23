import { Notification } from '@src/app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';
import { Content } from '@src/app/entities/notification/validation/content';
export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        category: raw.category,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
