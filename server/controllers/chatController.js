import { ChatModel } from "../models/chatModel.js";

export class ChatController {
  static async create(req, res) {
    const { name } = req.params;
    const { username } = req.body;
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

  static async getOne(req, res) {
    const { chatName } = req.body;
    try {
      const chat = await ChatModel.getOne({ name: chatName });
      if (!chat) throw new Error("Chat not found.");
      res.json(chat);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e.message });
    }
  }

  static async getAll(req, res) {
    try {
      const chatList = await ChatModel.getAll();
      if (!chatList) throw new Error("No chat rooms founded.");
      res.json(chatList);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
