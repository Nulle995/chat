import { ChatModel } from "../models/chatModel.js";

export class ChatController {
  static async create(req, res) {
    const { name, username } = req.body;
    try {
      const chatExists = await ChatModel.getOne({ name });
      if (chatExists) throw new Error("Chat with that name already exists.");
      const newChat = await ChatModel.create({ name, username });
      if (!newChat) throw new Error("Invalid username.");
      res.status(201).json({ chat: newChat });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
