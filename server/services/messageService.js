import { MessageModel } from "../models/messageModel.js";

export class MessageService {
  static async create({ username, chatName, content }) {
    return await MessageModel.create({ username, chatName, content });
  }

  static async update({ content, messageId }) {
    return await MessageModel.update({ content, messageId });
  }

  static async delete({ messageId }) {
    return await MessageModel.delete({ messageId });
  }

  static async getAuthorsFromRoom({ room }) {
    const authors = await MessageModel.getAuthorsFromRoom({ room });
    return authors;
  }
}
