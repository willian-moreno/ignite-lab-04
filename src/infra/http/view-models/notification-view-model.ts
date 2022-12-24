import { Notification } from '@app/entities/notification';

export interface NotificationViewModelProtocol {
  id: string;
  content: string;
  recipientId: string;
  category: string;
  readAt: Date | null | undefined;
  canceledAt: Date | null | undefined;
  createdAt: Date | null | undefined;
}
export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationViewModelProtocol {
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
}
