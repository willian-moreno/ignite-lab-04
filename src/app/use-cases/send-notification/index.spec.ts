import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { SendNotification } from '@app/use-cases/send-notification';
import { validNotification } from '@test/mocks/notification-mocks';

describe('Send notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let sendNotification: SendNotification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute({
      ...validNotification,
      content: String(validNotification.content),
    });

    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
