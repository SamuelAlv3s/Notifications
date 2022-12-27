import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotfound } from './errors/notification-not-found';

describe('CancelNotification', () => {
  it('should cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'test',
      content: new Content('Hello World'),
      recipientId: 'example-recipientId',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should throw an error if notification does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    await expect(
      cancelNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrowError(NotificationNotfound);
  });
});
