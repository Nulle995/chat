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

  static async update({ content, messageId }) {
    const editedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { content },
      include: { author: true },
    });
    return editedMessage;
  }

  static async delete({ messageId }) {
    const deletedMessage = await prisma.message.delete({
      where: { id: messageId },
    });
    return deletedMessage;
  }
}
