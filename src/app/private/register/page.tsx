"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const registerUser = api.user.register.useMutation({
    onSuccess: () => {
      redirect("/");
    },
  });

  const handleRegister = () => {
    if (form.email && form.password) registerUser.mutate(form);
  };

  return (
    <div className="flexCenter h-screen w-screen">
      <form onSubmit={handleRegister}>
        <input
          placeholder="Enter name"
          onChange={(e) =>
            setForm((form) => ({ ...form, name: e.target.value }))
          }
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
