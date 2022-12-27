import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotfound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = new Notification({
      category: 'test',
      content: new Content('Hello World'),
      recipientId: 'example-recipientId',
    });

    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should throw an error if notification does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    await expect(
      readNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrowError(NotificationNotfound);
  });
});
