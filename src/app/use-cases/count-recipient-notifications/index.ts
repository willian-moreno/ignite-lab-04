import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequestProtocol {
  recipientId: string;
}

interface CountRecipientNotificationsResponseProtocol {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequestProtocol,
  ): Promise<CountRecipientNotificationsResponseProtocol> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
