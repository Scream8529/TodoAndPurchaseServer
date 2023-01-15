export enum NotificationKey {
  addToGroup = 0,
  addedToGroup,
  newTask,
  newPurchase,
}
export enum NotificationStatus {
  new = 0,
  readed,
}

export interface Notification<T> {
  id: number;
  status_id: NotificationStatus;
  notification_key: NotificationKey;
  to_user: T;
  target_id: number;
}
