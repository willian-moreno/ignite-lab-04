import { SendNotification } from '@app/use-cases/send-notification/index';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayloadProtocol {
  content: string;
  category: string;
  recipientId: string;
}

@Controller('')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() payload: SendNotificationPayloadProtocol,
  ) {
    const { content, category, recipientId } = payload;

    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
