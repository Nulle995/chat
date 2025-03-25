import { MessageModel } from "../models/messageModel";

export class MessageService {
  static async create({ username, chatName, content }) {
    return await MessageModel.create({ username, chatName, content });
  }
}
