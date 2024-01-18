import { IoMdChatbubbles } from "react-icons/io";
import { io } from "socket.io-client";
import React from "react";
import { getServerAuthSession } from "@/server/auth";
import main from "@/chat";

async function Home() {
  const session = await getServerAuthSession();
  main();
  const socket = io("ws://localhost:3050");

  socket.emit("message", "Hey there");
  // console.log("Socket ---> ",socket)

  console.log(session);
  return (
    <div className="flexCenter h-full w-full flex-col text-gray-500 ">
      <div className="flexCenter h-[25vh] w-[25vh] text-[20vh]">
        <IoMdChatbubbles />
      </div>
      <p className="font-mono text-2xl font-semibold">No chats Selected</p>
    </div>
  );
}

export default Home;
