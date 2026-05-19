"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useEffectEvent, useState } from "react";
import { authClient } from "../../../lib/auth-client";
import { Avatar } from "@heroui/react";

const Navbar = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await authClient.getSession();
      setSession(data);
    };

    getData();
  }, []);
  const userData = session?.user;
  console.log(userData);
  return (
    <nav className="p-4 border bg-[#f8f5f0]">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="logo">
          <Image
            className=""
            src="/image/logo2.png"
            height={300}
            width={300}
            alt="logo"
          ></Image>
        </div>
        <ul className="flex items-center gap-6">
          <li className=" font-medium">
            <Link href="/">Home</Link>
          </li>
          <li className=" font-medium">
            <Link href="/all-rooms">All Rooms</Link>
          </li>
        </ul>
        {userData ? (
          <>
            <div className="flex items-center gap-1">
              <Avatar>
                <Avatar.Image
                  alt="John Doe"
                  src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <h1 className="text-xl font-semibold">{userData.name}</h1>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="btn btn-outline border-2 border-gray-300 rounded-full shadow-sm">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="btn btn-primary rounded-full bg-[#10b981] border-none shadow-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
