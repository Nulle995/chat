import { Router } from "express";
import { MessageController } from "../controllers/messageController";

export const messageRouter = Router();

messageRouter.post("/", MessageController.create);
