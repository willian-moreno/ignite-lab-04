import { Content } from '@src/app/entities/notification/validation/content';

export const validNotification = {
  content: new Content('You received a new message. Hello World!!'),
  category: 'social',
  recipientId: '74b0f951-876b-497c-ae4b-ce6997e50d64',
};
