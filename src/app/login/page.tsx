"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", { email: user.email, password:user.password});
      console.log("Signup success", response.data);
      console.log("Response", response)
      if ( response.status === 200) {
        toast.success("Login Sucessful");      
        router.push("/profile");
      } else {
        toast.error("Login Failed")
      }
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#7373E3]">
      <Toaster />

      <h1 className="text-5xl text-white mb-6 font-serif font-semibold">{loading ? "Processing" : "Login"}</h1>
      <br />
      <label htmlFor="email" className="text-gray-700">E-mail</label>
      <input
        className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-transparent"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password" className="text-gray-700">Password</label>
      <input
        className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-transparent"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 mb-3 rounded-lg"
      >
        {buttonDisabled ? "NO LOGIN" : "LOGIN"}
      </button>
      <Link href="/signup" className="text-gray-700">Sign Up Page</Link>
      
      <Link href="/forgotpassword">
      <button
        className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 mt-3 rounded-lg"
      >
        Forgot Password
      </button>
      </Link>
    </div>
  );
}
