"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { authClient } from "../../../lib/auth-client";

import { Avatar, Button } from "@heroui/react";

import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  // Public Links
  const publicLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Rooms",
      href: "/all-rooms",
    },
  ];

  // Private Links
  const privateLinks = [
    {
      name: "Add Room",
      href: "/add-room",
    },
    {
      name: "My Listings",
      href: "/my-room",
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
    },
  ];

  // Active Route Style
  const navLinkStyle = (href) =>
    `relative text-[16px] font-medium transition pb-1
    ${
      pathname === href
        ? "text-[#10b981] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#10b981]"
        : "text-gray-700 hover:text-[#10b981]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#f8f5f0]/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/image/logo2.png"
              width={160}
              height={160}
              alt="logo"
              className="w-[130px] md:w-[160px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkStyle(link.href)}
              >
                {link.name}
              </Link>
            ))}

            {/* Private Links */}
            {user &&
              privateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkStyle(link.href)}
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3 relative">
            {user ? (
              <>
                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 border border-gray-200 rounded-full px-2 py-2 bg-white shadow-sm hover:shadow-md transition"
                >
                  <Avatar
                    src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    className="w-11 h-11"
                  />

                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-gray-800 leading-none">
                      {user?.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">My Account</p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute top-20 right-0 w-[320px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-5">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={
                          user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        className="w-16 h-16"
                      />

                      <div>
                        <h2 className="font-semibold text-gray-800 text-lg">
                          {user?.name}
                        </h2>

                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-200 my-5"></div>

                    {/* Dropdown Links */}
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/my-listings"
                        className={`px-4 py-3 rounded-2xl transition font-medium ${
                          pathname === "/my-listings"
                            ? "bg-[#10b981]/10 text-[#10b981]"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        My Listings
                      </Link>

                      <Link
                        href="/my-bookings"
                        className={`px-4 py-3 rounded-2xl transition font-medium ${
                          pathname === "/my-bookings"
                            ? "bg-[#10b981]/10 text-[#10b981]"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        My Bookings
                      </Link>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-200 my-5"></div>

                    {/* Logout */}
                    <button
                      onClick={async () => {
                        await authClient.signOut();
                      }}
                      className="w-full text-left px-4 py-3 rounded-2xl hover:bg-red-50 transition text-red-500 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="bordered" radius="full">
                    Login
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button radius="full" className="bg-[#10b981] text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-5">
            <div className="flex flex-col gap-4">
              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium ${
                    pathname === link.href ? "text-[#10b981]" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Private Links */}
              {user &&
                privateLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium ${
                      pathname === link.href
                        ? "text-[#10b981]"
                        : "text-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

              {/* Logout */}
              {user && (
                <Button
                  color="danger"
                  variant="flat"
                  onPress={async () => {
                    await authClient.signOut();
                  }}
                >
                  Logout
                </Button>
              )}

              {/* Auth Buttons */}
              {!user && (
                <div className="flex flex-col gap-3 pt-3">
                  <Link href="/login">
                    <Button fullWidth variant="bordered">
                      Login
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button fullWidth className="bg-[#10b981] text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
