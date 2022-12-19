import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error(notificationId);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.mappedFields(notification);

    await this.prismaService.notification.create({ data });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error(notification.id);
  }
}
