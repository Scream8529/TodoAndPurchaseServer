export enum PurchaseState {
  Open = 0,
  Done,
  Removed,
}

export interface GetPurchasesData {
  id: number;
  page: number;
  page_size: number;
}
export interface AddPurchaseData {
  title: string;
}

export interface StatePurchaseData {
  purchaseId: number;
  state: PurchaseState;
}
