import {
  Notification,
  NotificationProtocol,
} from '@src/app/entities/notification/notification';
import { validNotification } from '@test/mocks/notification-mocks';
type Override = Partial<NotificationProtocol>;

export async function makeNotification(
  override: Override = {},
): Promise<Notification> {
  return new Notification({
    ...validNotification,
    ...override,
  });
}
