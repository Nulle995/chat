import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.use(json());
app.use(cors());

const PORT = 3001;

io.on("connection", (stream) => {
  console.log(`Conectado: ${stream.id}`);
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
