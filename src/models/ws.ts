export interface WSMessage {
  status: keyof WSStatus;
  data: WSData;
}

export interface WSStatus {
  0: "other";
  1: "newTask";
  2: "newPurchase";
  4: "newNotification";
}

export interface WSData {
  id?: string;
  author_id?: string;
  name?: string;
  description?: string;
}
