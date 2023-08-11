"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
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

  const getUserDetails = async () => {
    const res = await axios.get("api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-[#7373E3]">
      <h1 className="text-4xl py-4 text-white">Profile</h1>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className="p-1 rounded bg-green-300">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <br />
        <button
          onClick={logout}
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 mt-8 rounded-lg"
        >
          Logout
        </button>
        <br />
        <button
          onClick={getUserDetails}
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 mt-8 rounded-lg"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
