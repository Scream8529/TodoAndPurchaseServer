import { Prisma, User } from "@prisma/client";
import dborm from "../db";

class UserService {
  private User: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor() {
    this.User = dborm.client.user;
  }
  createUser = async (
    user: Omit<User, "id" | "groups" | "avatar" | "firstName" | "lastName">
  ): Promise<User> => {
    try {
      const res = await this.User.create({
        data: { ...user },
      });
      return res;
    } catch (error) {
      return error.message;
    }
  };

  getUserByUserName = async (userName: string): Promise<User> => {
    try {
      const res = this.User.findUnique({ where: { userName } });
      return res;
    } catch (error) {}
  };

  getUserById = async (id: number): Promise<User> => {
    try {
      const res = this.User.findUnique({ where: { id } });
      return res;
    } catch (error) {}
  };

  updateUser = async (
    userId: number,
    firstName: string,
    lastName: string
  ): Promise<User> => {
    try {
      const res = await this.User.update({
        where: { id: userId },
        data: { firstName, lastName },
      });
      return;
    } catch (error) {}
  };
  addToGroup = async () => {
    try {
    } catch (error) {
      return error;
    }
  };
}

export default new UserService();
