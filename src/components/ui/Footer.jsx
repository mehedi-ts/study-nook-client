"use client";

import Image from "next/image";
import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 rounded-t-[40px] overflow-hidden mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/image/logo2.png"
                alt="logo"
                width={180}
                height={60}
                className="object-contain w-auto h-auto"
              />
            </Link>

            <p className="text-gray-600 leading-7 text-sm">
              Premium study spaces for focused minds. Book your perfect study
              room today.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300 text-gray-700"
              >
                <RiFacebookFill className="text-lg" />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300 text-gray-700"
              >
                <RiTwitterXFill className="text-lg" />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300 text-gray-700"
              >
                <RiInstagramLine className="text-lg" />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300 text-gray-700"
              >
                <RiLinkedinFill className="text-lg" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-rooms" className="hover:text-green-500">
                  All Rooms
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-green-500">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/my-room" className="hover:text-green-500">
                  My Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">Support</h3>

            <ul className="space-y-4 text-gray-600">
              <li>
                <Link href="/faq" className="hover:text-green-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-green-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="hover:text-green-500"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-green-500">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info (UPDATED SECTION) */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">
              Contact Info
            </h3>

            <div className="space-y-5 text-gray-600 text-sm">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <RiMailLine className="text-lg text-gray-700" />
                </div>
                <span>support@studynook.com</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <RiMapPinLine className="text-lg text-gray-700" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <RiPhoneLine className="text-lg text-gray-700" />
                </div>
                <span>+880 1234 567890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2024 StudyNook. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Made with <span className="text-red-500">♥</span> for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
