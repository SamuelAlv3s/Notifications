import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  findManyByRecipient(recipientId: string): Promise<Notification[]> {
    return Promise.resolve(
      this.notifications.filter((item) => item.recipientId === recipientId),
    );
  }
  countManyByRecipientId(recipientId: string): Promise<number> {
    return Promise.resolve(
      this.notifications.filter((item) => item.recipientId === recipientId)
        .length,
    );
  }
  findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    return notification ? Promise.resolve(notification) : Promise.resolve(null);
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    this.notifications[notificationIndex] = notification;
  }
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
