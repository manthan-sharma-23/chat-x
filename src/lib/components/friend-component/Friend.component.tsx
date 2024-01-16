import React from "react";
import Logo from "../../../../public/images/logo-transparent.png";
import Image from "next/image";
import Link from "next/link";

function Friend() {
  return (
    <div className="flexCenter h-screen w-[20vw] flex-col justify-start border-l-2 border-gray-500 text-white">
      <div className="flexCenter h-1/6 w-full p-[4vh] ">
        <Image src={Logo} width={250} height={60} alt="Logo" className="" />
      </div>
      <div className="h-5/6 w-full">
        <div className="h-[85%] w-full"></div>
        <div className=" flexCenter h-[15%] w-full">
          <Link
            href={""}
            className="hover:text-gradient-to-r text-2xl font-semibold transition-all duration-300 hover:from-rose-300 hover:via-rose-400 hover:to-rose-500"
          >
            Signout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Friend;
