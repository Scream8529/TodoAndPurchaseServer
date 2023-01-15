import { PrismaClient } from "@prisma/client";

class Database {
  public client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
    this.client.$connect();
  }
}

const dborm = new Database();

export default dborm;
