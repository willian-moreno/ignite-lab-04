import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@app/use-cases/cancel-notifications';
import { Notification } from '@src/app/entities/notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let cancelNotification: CancelNotification;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotification = new CancelNotification(notificationsRepository);
    notification = makeNotification();
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to cancel a notification', async () => {
    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    await notificationsRepository.create(notification);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
