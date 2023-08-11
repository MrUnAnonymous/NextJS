"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#7373E3]">
      <h1>Profile</h1>
      <br />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>


      <button
        onClick={logout}
        className= "absolute top-5 right-10 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 mt-8 rounded-lg ease-in-out duration-300"
      >
        Logout
      </button>
    </div>
  );
}
