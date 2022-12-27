import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('GetRecipientNotifications', () => {
  it('should get notifications by recipientId', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: notification.recipientId,
        }),
        expect.objectContaining({
          recipientId: notification2.recipientId,
        }),
      ]),
    );
  });
});
