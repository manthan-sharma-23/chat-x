import Sidebar from "@/lib/components/Sidebar/Sidebar";
import Friend from "@/lib/components/friend-component/Friend.component";
import { SocketProvider } from "@/lib/context/provider/socket.provider";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <div className="flexCenter h-screen w-screen text-white">
        <Sidebar />
        <div className="h-full w-[60vw] ">{children}</div>
        <Friend />
      </div>
    </SocketProvider>
  );
}

export default HomeLayout;
