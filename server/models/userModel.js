import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  static async create({ username, password }) {
    const newUser = await prisma.user.create({ data: { username, password } });
    return newUser;
  }

  static async createRefreshToken({ token }) {
    const refreshToken = await prisma.refreshToken.create({ data: { token } });
  }
}
