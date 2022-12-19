import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@app/use-cases/cancel-notifications';
import { Notification } from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/validation/content';

describe('Cancel notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let cancelNotification: CancelNotification;
  let notification: Notification;

  const mocks = {
    valid: {
      content: new Content('You received a new message. Hello World!!'),
      category: 'social',
      recipientId: `123j-ks34-aj3Kj4`,
    },
  };

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotification = new CancelNotification(notificationsRepository);
    notification = new Notification(mocks.valid);
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

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
});
