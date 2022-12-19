import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { SendNotification } from '@app/use-cases/send-notification';

describe('Send notification use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let sendNotification: SendNotification;

  const mocks = {
    valid: {
      content: 'You received a new message. Hello World!!',
      category: 'social',
      recipientId: `123j-ks34-aj3Kj4`,
    },
  };

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute(mocks.valid);
    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
