import cors from "cors";
import cookieParser from "cookie-parser";
import express, { json } from "express";
import { createServer } from "node:http";
import initializeSocketIO from "./websocket.js";

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

const server = createServer(app);
const io = initializeSocketIO(server);

const PORT = 3001;

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
