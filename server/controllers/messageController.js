import { MessageModel } from "../models/messageModel.js";

export class MessageController {
  static async create(req, res) {
    const { username, chatName, content } = req.body;
    try {
      const newMessage = await MessageModel.create({
        username,
        chatName,
        content,
      });
      if (!newMessage) throw new Error("Coulnd't create new message.");
      console.log(newMessage);
      res.status(201).json({ newMessage });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
