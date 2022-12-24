import { DatabaseModule } from './../database/database.module';
import { NotificationsController } from '@src/infra/messaging/kafka/controllers/notifications.controller';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { SendNotification } from '@src/app/use-cases/send-notification';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
