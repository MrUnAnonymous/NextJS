"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function ForgotPassword() {
    const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const forgotPassword = async () => {

    try {
      await axios.post("api/users/forgotpassword", { email:user.email, token });
    } catch (error: any) {
      setError(true);
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      forgotPassword();
    }
  }, [token]);

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col item-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password?</h1>
      <br />
      <label htmlFor="email">Enter Registered Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <button
        onClick={forgotPassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Enter Email" : "SUBMIT"}
      </button>
    </div>
  );
}
