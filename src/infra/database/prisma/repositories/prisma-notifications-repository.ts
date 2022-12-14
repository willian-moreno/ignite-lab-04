import { Notification } from '#/app/entities/notification/notification';
import { NotificationsRepository } from '#/app/repositories/notifications-repository';
import { PrismaService } from '#/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };

    await this.prismaService.notification.create({ data });
  }
}
