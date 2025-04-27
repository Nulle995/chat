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

  static async getAll({ search = "", skip = 0, limit = 20 }) {
    const where = search ? { username: { contains: search } } : {};
    const [allUsers, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        where,
        select: {
          id: true,
          username: true,
          role: true,
          _count: true,
        },
      }),
      prisma.user.count({ where }),
    ]);
    return { allUsers, total };
  }

  static async getOne({ username }) {
    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        chats: true,
        role: true,
        messages: {
          select: {
            content: true,
            date: true,
            chat: { select: { name: true, owner: true } },
          },
        },
        username: true,
        id: true,
        chatRole: { select: { chat: true, role: true } },
      },
    });
    return user;
  }
}
