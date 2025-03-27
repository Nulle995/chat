import { MessageModel } from "../models/messageModel.js";

export class MessageService {
  static async create({ username, chatName, content }) {
    return await MessageModel.create({ username, chatName, content });
  }
}
