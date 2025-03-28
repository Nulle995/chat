import { Router } from "express";
import { ChatController } from "../controllers/chatController.js";
import { authenticateAccessToken } from "../middlewares/tokenMiddleware.js";

export const chatRouter = Router();

chatRouter.get("/all", ChatController.getAll);
chatRouter.get("/:name", ChatController.getOne);
chatRouter.post("/", authenticateAccessToken, ChatController.create);
