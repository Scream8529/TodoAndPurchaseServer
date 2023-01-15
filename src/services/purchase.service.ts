import { Prisma, Purchase } from "@prisma/client";
import dborm from "../db";

class PurchaseService {
  private Purchase: Prisma.PurchaseDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor() {
    this.Purchase = dborm.client.purchase;
  }
  async getAll({
    id,
    page,
    page_size,
  }: {
    id: number;
    page: number;
    page_size: number;
  }): Promise<{ results: Purchase[] }> {
    try {
      const purchases = await this.Purchase.findMany({
        where: { id },
        skip: page * (page_size - 1),
        take: page_size,
      });
      return { results: purchases };
    } catch (error) {
      return error;
    }
  }
  async add(author_id: number, title: string): Promise<Purchase> {
    try {
      const purchases = this.Purchase.create({
        data: {
          author_id,
          title,
          status: 0,
        },
      });
      return purchases;
    } catch (error) {
      return error;
    }
  }
  async remove(id: number): Promise<boolean | Error> {
    try {
      const purchase = this.Purchase.delete({ where: { id } });
      if (!purchase) {
        throw Error(`Not found purchase where id ${id}`);
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  async changeState(purchaseId: number, stateId: number): Promise<Purchase> {
    try {
      const purchases = this.Purchase.update({
        where: { id: purchaseId },
        data: { status: stateId },
      });
      return purchases;
    } catch (error) {
      return error;
    }
  }
}

export const purchaseService = new PurchaseService();
