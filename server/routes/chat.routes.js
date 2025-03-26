import { Router } from "express";
import { ChatController } from "../controllers/chatController.js";

export const chatRouter = Router();

chatRouter.get("/all", ChatController.getAll);
chatRouter.get("/:name", ChatController.getOne);
chatRouter.post("/", ChatController.create);
