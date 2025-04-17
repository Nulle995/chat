import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ChatParticipantModel {
  static async join({ username, room }) {
    const user = await prisma.user.findUnique({ where: { username } });
    const chat = await prisma.chat.findUnique({ where: { name: room } });
    console.log(user.id);
    console.log(chat.id);
    const joinedUser = await prisma.chatRoomUser.create({
      data: {
        userId: user.id,
        chatId: chat.id,
      },
    });
    return joinedUser;
  }

  static async getParticipantsFromRoom({ room }) {
    const participants = await prisma.chatRoomUser.findMany({
      where: { chat: { name: room } },
      select: { user: { select: { username: true } } },
    });
    return participants.map((p) => p.user);
  }
}
