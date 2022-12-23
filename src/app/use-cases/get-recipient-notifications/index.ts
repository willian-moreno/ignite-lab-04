import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@src/app/entities/notification';

interface GetRecipientNotificationsRequestProtocol {
  recipientId: string;
}

interface GetRecipientNotificationsResponseProtocol {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequestProtocol,
  ): Promise<GetRecipientNotificationsResponseProtocol> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
