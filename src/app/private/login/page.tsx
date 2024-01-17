"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Logo from "../../../../public/images/logo-transparent.png";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  console.log(form);

  const handleRegister = () => {
    console.log("inside handle");
    setTimeout(() => {
      console.log("timeout");
    }, 2000);
    if (form.email && form.password) console.log("siginin processing");
    signIn("credentials", { ...form, callbackUrl: "/home" })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
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
          placeholder="Enter email"
          onChange={(e) =>
            setForm((form) => ({ ...form, email: e.target.value }))
          }
        />
        <input
          placeholder="Enter password"
          onChange={(e) =>
            setForm((form) => ({ ...form, password: e.target.value }))
          }
        />
        <button type="submit" className="border-[1px] p-2 text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
