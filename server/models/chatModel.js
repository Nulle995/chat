import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ChatModel {
  static async create({ name, username }) {
    const newChat = await prisma.chat.create({
      data: {
        name,
        owner: {
          connect: { username },
        },
      },
    });
    return newChat;
  }

  static async getOne({ name }) {
    const chat = await prisma.chat.findFirst({
      where: { name },
      include: { owner: true, messages: true },
    });
    return chat;
  }
}
