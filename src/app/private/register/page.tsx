"use client";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Logo from "../../../../public/images/logo-transparent.png";

function Register() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const hello = api.user.hello.useQuery();

  console.log(hello.data);

  const registerUser = api.user.register.useMutation({
    onSuccess: () => {
      redirect("/");
    },
  });
  const handleRegister = () => {
    if (email && password) {
      console.log("running");
      const res = registerUser.mutate({ name, email, password });
    }

    redirect("/home");
  };

  return (
    <div className="flexCenter h-screen w-screen flex-col">
      <div className="flexCenter ">
        <Link href="/home">
          <Image src={Logo} alt="app_logo" width={300} height={300} />
        </Link>
      </div>
      <form
        onSubmit={handleRegister}
        className="flexCenter my-3 flex-col gap-2"
      >
        <input
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="border-[1px] p-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
