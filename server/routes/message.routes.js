import { Router } from "express";
import { MessageController } from "../controllers/messageController.js";
import {
  authenticateAccessToken,
  hasPermission,
} from "../middlewares/tokenMiddleware.js";

export const messageRouter = Router();

messageRouter.post("/", authenticateAccessToken, MessageController.create);
messageRouter.patch(
  "/",
  authenticateAccessToken,
  hasPermission,
  MessageController.update
);
messageRouter.delete(
  "/",
  authenticateAccessToken,
  hasPermission,
  MessageController.delete
);
