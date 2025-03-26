import { Router } from "express";
import { MessageController } from "../controllers/messageController";

const messageRouter = Router();

messageRouter.post("/", MessageController.create);
