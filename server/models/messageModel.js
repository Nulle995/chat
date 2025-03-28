import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MessageModel {
  static async create({ username, chatName, content }) {
    const newMessage = await prisma.message.create({
      data: {
        content,
        author: { connect: { username } },
        chat: { connect: { name: chatName } },
      },
      include: {
        author: true,
      },
    });
    return newMessage;
  }
}
