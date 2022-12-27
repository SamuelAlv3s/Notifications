import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('CountRecipientNotifications', () => {
  it('should count notifications by recipientId', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    const notification = new Notification({
      category: 'test',
      content: new Content('Hello World'),
      recipientId: 'example-recipientId',
    });

    const notification2 = new Notification({
      category: 'test',
      content: new Content('Hello World'),
      recipientId: 'example-recipientId',
    });

    const notification3 = new Notification({
      category: 'test',
      content: new Content('Hello World'),
      recipientId: 'example-recipientId2',
    });

    await notificationRepository.create(notification);
    await notificationRepository.create(notification2);
    await notificationRepository.create(notification3);

    const count = await countRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toEqual({ count: 2 });
  });
});
