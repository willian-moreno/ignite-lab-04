import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    // const notification = await this.prismaService.notification.findUnique({
    //   where: {
    //     id: notificationId,
    //   },
    // });

    // return notification;

    throw new Error(notificationId);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({ data });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error(notification.id);
  }
}
