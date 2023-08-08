"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const NewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
    const email = searchParams.get('email')
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = React.useState({
    password: "",
    cpassword: "",
    email: "",
  });

  const newPassword = async () => {
    try {
      await axios.post("api/users/newpassword", {
        email: user.email,
        password: user.password,
      });
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    
    const urlEmail = window.location.search.split("=")[1];
    setUser({ ...user, email: urlEmail })
    console.log(urlEmail)
  }, []);

  useEffect(() => {
    console.log("EMAIL->", email)
  }, [email])

  
  useEffect(() => {
    console.log("EMail-->", user.email)
    if (user.password.length > 0 && user.cpassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col item-center justify-center min-h-screen py-2">
      <label htmlFor="password">Enter New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <br />
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.cpassword}
        onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={newPassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Submit" : "SUBMIT"}
      </button>
    </div>
  );
};

export default NewPassword;
