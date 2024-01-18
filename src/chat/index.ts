import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const port = 3050;

export default function main() {
  console.log("CHAT____----------------------->> ");
  const io = new Server(server);
  io.on("connection", (socket) => {
    socket.on("message", (message) => {
      console.log("MESSAGE " + message);
    });
  });

  server.listen(port, () => {
    console.log(`Chat server running on port ${port}`);
  });
}
