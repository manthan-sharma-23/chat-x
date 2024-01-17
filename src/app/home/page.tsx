import { IoMdChatbubbles } from "react-icons/io";
import React from "react";
import { getServerAuthSession } from "@/server/auth";

async function Home() {
  const session = await getServerAuthSession();

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
