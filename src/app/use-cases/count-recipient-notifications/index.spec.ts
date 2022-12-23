import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { makeMultipleNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let countRecipientNotifications: CountRecipientNotifications;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to count the recipient notifications', async () => {
    createNotificationsProviderByRecipientIdAndQuantity('recipient-1', 7);
    createNotificationsProviderByRecipientIdAndQuantity('recipient-2', 3);

    const countRecipient1 = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    const countRecipient2 = await countRecipientNotifications.execute({
      recipientId: 'recipient-2',
    });

    expect(countRecipient1.count).toEqual(7);
    expect(countRecipient2.count).toEqual(3);
  });

  function createNotificationsProviderByRecipientIdAndQuantity(
    recipientId: string,
    quantity: number,
  ) {
    makeMultipleNotification(
      { recipientId },
      quantity,
      async (notification) => {
        await notificationsRepository.create(notification);
      },
    );
  }
});
