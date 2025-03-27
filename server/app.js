import cors from "cors";
import cookieParser from "cookie-parser";
import express, { json } from "express";
import { createServer } from "node:http";
import initializeSocketIO from "./websocket.js";
import { authRouter } from "./routes/auth.routes.js";
import { chatRouter } from "./routes/chat.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use("auth", authRouter);
app.use("chat", chatRouter);
app.use("messages", messageRouter);
app.use("user", userRouter);
const server = createServer(app);
const io = initializeSocketIO(server);

const PORT = 3001;

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
