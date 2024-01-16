import { getServerAuthSession } from "@/server/auth";
import React from "react";
import Logo from "../../../../public/logo.png";
import Image from "next/image";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <div className="h-[10vh] w-screen border-y-[2px] border-gray-500">
      <div className="flexCenter h-full w-[10rem] ">
        <Image src={Logo} width={60} height={60} alt="logo" />
      </div>
      <div></div>
    </div>
  );
}
