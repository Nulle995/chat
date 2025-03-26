import { Router } from "express";
import {
  authenticateAccessToken,
  getNewAccessToken,
} from "../middlewares/tokenMiddleware.js";

export const authRouter = Router();

authRouter.get("/token/refresh", getNewAccessToken);
authRouter.get("/token/access", authenticateAccessToken);
