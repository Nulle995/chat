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
      if (!newMessage) throw new Error("Couldn't create new message.");
      console.log(newMessage);
      res.status(201).json({ newMessage });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async update(req, res) {
    const { content, messageId } = req.body;
    try {
      const newMessage = await MessageModel.update({ content, messageId });
      if (!newMessage) throw new Error("Couldn't update the message.");
      res.json({ newMessage });
    } catch (e) {
      res.status(204).json({ error: e.message });
    }
  }

  static async delete(req, res) {
    const { messageId } = req.body;

    try {
      const deletedMessage = await MessageModel.delete({ messageId });
      if (!deletedMessage) throw new Error("Couldn't delete the message.");
      res.json({ message: "successful" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
