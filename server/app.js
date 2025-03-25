import cors from "cors";
import cookieParser from "cookie-parser";
import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.use(json());
app.use(cors());
app.use(cookieParser());

const PORT = 3001;

io.on("connection", (stream) => {
  console.log(`Conectado: ${stream.id}`);
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
