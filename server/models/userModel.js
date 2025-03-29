import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  static async create({ username, password }) {
    const newUser = await prisma.user.create({ data: { username, password } });
    return newUser;
  }

  static async login({ username }) {
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
  }

  static async logout({ token }) {
    const refreshToken = await prisma.refreshToken.delete({ where: { token } });
    return refreshToken;
  }

  static async createRefreshToken({ token }) {
    console.log(token);
    const refreshToken = await prisma.refreshToken.create({ data: { token } });
    return refreshToken.token;
  }
}
