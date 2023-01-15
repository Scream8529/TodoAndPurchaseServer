import dborm from "../db";
import { Notification, Prisma } from "@prisma/client";

class NotificationService {
  private Notification: Prisma.NotificationDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor() {
    this.Notification = dborm.client.notification;
  }
  async add({
    status,
    notification_key,
    receiver,
    target_id,
  }: Omit<Notification, "id">): Promise<Notification> {
    try {
      const purchases = await this.Notification.create({
        data: {
          status,
          notification_key,
          receiver,
          target_id,
        },
      });
      return purchases;
    } catch (error) {
      return error;
    }
  }

  async changeStatus({
    status,
    notificationId,
  }: {
    status: number;
    notificationId: number;
  }): Promise<Notification> {
    try {
      const purchases = await this.Notification.update({
        where: { id: notificationId },
        data: { status },
      });
      return purchases;
    } catch (error) {
      return error;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
