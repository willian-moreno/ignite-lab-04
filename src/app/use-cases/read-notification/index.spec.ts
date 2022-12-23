import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { ReadNotification } from '@app/use-cases/read-notification';
import { Notification } from '@src/app/entities/notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Read notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let readNotification: ReadNotification;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    readNotification = new ReadNotification(notificationsRepository);
    notification = makeNotification();
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to set the notification as read', async () => {
    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    await notificationsRepository.create(notification);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
