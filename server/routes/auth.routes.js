import { Router } from "express";
import {
  authenticateAccessToken,
  decodeAccessToken,
  getNewAccessToken,
} from "../middlewares/tokenMiddleware.js";

export const authRouter = Router();

authRouter.get("/token/refresh", getNewAccessToken);
authRouter.get("/token/access", authenticateAccessToken);
authRouter.get("/token/me", authenticateAccessToken, decodeAccessToken);
