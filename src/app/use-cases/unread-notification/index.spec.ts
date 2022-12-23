import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { Notification } from '@src/app/entities/notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Unread notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let unreadNotification: UnreadNotification;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    unreadNotification = new UnreadNotification(notificationsRepository);
    notification = makeNotification({ readAt: new Date() });
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to set the notification as unread', async () => {
    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    await notificationsRepository.create(notification);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
