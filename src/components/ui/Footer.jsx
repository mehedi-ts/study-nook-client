"use client";

import Image from "next/image";
import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
  RiArrowRightLine,
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
                <Link
                  href="/"
                  className="hover:text-green-500 transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="hover:text-green-500 transition duration-300"
                >
                  Study Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/membership"
                  className="hover:text-green-500 transition duration-300"
                >
                  Membership
                </Link>
              </li>

              <li>
                <Link
                  href="/reviews"
                  className="hover:text-green-500 transition duration-300"
                >
                  Reviews
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-500 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">Support</h3>

            <ul className="space-y-4 text-gray-600">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-green-500 transition duration-300"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="hover:text-green-500 transition duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-green-500 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/cancellation-policy"
                  className="hover:text-green-500 transition duration-300"
                >
                  Cancellation Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/help-center"
                  className="hover:text-green-500 transition duration-300"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">
              Stay Updated
            </h3>

            <p className="text-gray-600 text-sm leading-7 mb-6">
              Subscribe to get exclusive offers and study tips.
            </p>

            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden p-1 border border-gray-200">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-black outline-none bg-transparent text-sm"
              />

              <button className="w-11 h-11 rounded-full bg-green-500 hover:bg-green-600 transition duration-300 flex items-center justify-center text-white">
                <RiArrowRightLine className="text-xl" />
              </button>
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
