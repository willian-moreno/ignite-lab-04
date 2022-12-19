import { Content } from '@app/entities/notification/validation/content';

describe('Notification content', () => {
  it('should be able to create a notification with valid content length', () => {
    const content = new Content('Writing notification content');

    expect(content).toBeTruthy();
    expect(content.value).toEqual('Writing notification content');
  });

  it('should be not able to create a content notification with less than 5 characters', () => {
    expect(() => new Content('a', 5)).toThrowError(
      'Content length is smallest than 5 characters',
    );
  });

  it('should be not able to create a content notification with more than 255 characters', () => {
    expect(() => new Content('a'.repeat(256), 5, 255)).toThrowError(
      'Content length is largest than 255 characters',
    );
  });
});
