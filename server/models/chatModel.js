import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ChatModel {
  static async create({ name, username }) {
    await prisma.$transaction(async (tx) => {
      const newChat = await tx.chat.create({
        data: {
          name,
          owner: {
            connect: { username },
          },
        },
      });
      const newAdmin = await tx.chatRoomUser.create({
        data: {
          chatId: newChat.id,
          userId: newChat.ownerId,
          role: "OWNER",
        },
      });
      return newChat;
    });
  }

  static async getOne({ name }) {
    const chat = await prisma.chat.findFirst({
      where: { name },
      include: { owner: true, messages: { include: { author: true } } },
    });
    return chat;
  }

  static async getAll() {
    const chatList = await prisma.chat.findMany({ include: { owner: true } });
    return chatList;
  }
}
