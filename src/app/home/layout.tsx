import Sidebar from "@/lib/components/Sidebar/Sidebar";
import Friend from "@/lib/components/friend-component/Friend.component";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flexCenter h-screen w-screen">
      <Sidebar />
      <div className="h-full w-[60vw] ">{children}hi</div>
      <Friend />
    </div>
  );
}

export default HomeLayout;
