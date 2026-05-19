import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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
        <div className="flex items-center gap-3">
          <button className="btn btn-outline border-2 border-gray-300 rounded-full shadow-sm">
            Login
          </button>
          <button className="btn btn-primary rounded-full bg-[#10b981] border-none shadow-sm">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
