"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { authClient } from "../../../lib/auth-client";
import { Button } from "@heroui/react";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Rooms", href: "/all-rooms" },
  ];

  const privateLinks = [
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-room" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const navLinkStyle = (href) =>
    `relative text-[16px] font-medium transition pb-1 ${
      pathname === href
        ? "text-emerald-500 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-emerald-500"
        : "text-gray-700 hover:text-emerald-500"
    }`;

  const getInitials = (name) => {
    if (!name) return "U";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/image/logo2.png"
              width={160}
              height={160}
              alt="logo"
              className="w-[120px] md:w-[150px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkStyle(link.href)}
              >
                {link.name}
              </Link>
            ))}

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

          {/* Right Side (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 relative">
            {user ? (
              <>
                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 border border-gray-200 rounded-full px-2 py-1.5 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-white font-semibold">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>

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
                  <div className="absolute top-20 right-0 w-[320px] bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                        {user?.image ? (
                          <Image
                            src={user.image}
                            alt="avatar"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(user?.name)
                        )}
                      </div>

                      <div>
                        <h2 className="font-semibold text-gray-800 text-lg">
                          {user?.name}
                        </h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-gray-200 my-5" />

                    <div className="flex flex-col gap-2">
                      <Link
                        href="/my-room"
                        className={`px-4 py-3 rounded-2xl transition font-medium ${
                          pathname === "/my-room"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        My Listings
                      </Link>

                      <Link
                        href="/my-bookings"
                        className={`px-4 py-3 rounded-2xl transition font-medium ${
                          pathname === "/my-bookings"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        My Bookings
                      </Link>
                    </div>

                    <div className="h-[1px] bg-gray-200 my-5" />

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
                  <Button radius="full" className="bg-emerald-500 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
          {/* Profile */}
          {user && (
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-white font-semibold">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(user?.name)
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {user?.name}
                </h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col p-2">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700"
              >
                {link.name}
              </Link>
            ))}

            {user &&
              privateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700"
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Logout */}
          {user && (
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={async () => {
                  await authClient.signOut();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl bg-red-50 text-red-500 font-medium hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}

          {/* Auth */}
          {!user && (
            <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full" variant="bordered" radius="full">
                  Login
                </Button>
              </Link>

              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                <Button
                  className="w-full bg-emerald-500 text-white"
                  radius="full"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
