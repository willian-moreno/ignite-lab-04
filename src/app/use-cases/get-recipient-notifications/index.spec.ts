import { InMemoryNotificationsRepository } from '@test/app/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { makeMultipleNotification } from '@test/factories/notification-factory';

describe('Get recipient notifications use case', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let getRecipientNotifications: GetRecipientNotifications;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );
  });

  afterEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able to get the recipient notifications', async () => {
    createNotificationsProviderByRecipientIdAndQuantity('recipient-1', 5);
    createNotificationsProviderByRecipientIdAndQuantity('recipient-2', 2);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    const findOtherRecipientId = !!notifications.find(
      (notification) => notification.recipientId !== 'recipient-1',
    );

    const recipientIdExpected = {
      recipientId: 'recipient-1',
    };

    expect(notifications).toHaveLength(5);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining(recipientIdExpected),
        expect.objectContaining(recipientIdExpected),
        expect.objectContaining(recipientIdExpected),
        expect.objectContaining(recipientIdExpected),
        expect.objectContaining(recipientIdExpected),
      ]),
    );
    expect(findOtherRecipientId).toBeFalsy();
  });

  it('should be able to not found the recipient notifications', async () => {
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(0);
    expect(notifications).toEqual([]);
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
