import { Content } from '@src/app/entities/notification/validation/content';

export const validNotification = {
  content: new Content('You received a new message. Hello World!!'),
  category: 'social',
  recipientId: `recipient`,
};
