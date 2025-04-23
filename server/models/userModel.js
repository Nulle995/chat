import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  static async create({ username, password, role }) {
    const validatedRole = role ? role : "user";
    const newUser = await prisma.user.create({
      data: { username, password, role: validatedRole },
    });
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
    const refreshToken = await prisma.refreshToken.create({ data: { token } });
    return refreshToken.token;
  }

  static async getAll() {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        _count: true,
      },
    });
    return allUsers;
  }
}
