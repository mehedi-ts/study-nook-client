"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "../../../lib/auth-client";

import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData.entries());

    const { email, password, image, name } = userData;

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      callbackURL: "/",
    });

    // Error Handle
    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    // Success
    toast.success("Registration successful! Please login.");
    await authClient.signOut();

    router.push("/login");
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Register to get started with your account
          </p>
        </div>

        {/* Form */}
        <Form className="flex flex-col gap-1 w-full" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-1">
              Name
            </Label>

            <Input placeholder="John Doe" className="w-full" />

            <div className="min-h-5 mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>

            <Input placeholder="john@example.com" className="w-full" />

            <div className="min-h-[20px] mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Image URL */}
          <TextField isRequired name="image" type="text" className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </Label>

            <Input placeholder="Your profile image url" className="w-full" />

            <div className="min-h-[20px] mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Password (UPDATED) */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>

            <Input placeholder="Enter your password" className="w-full" />

            <Description className="text-xs text-gray-500 mt-1">
              Must be 8+ characters, include 1 uppercase & 1 lowercase
            </Description>

            <div className="min-h-[20px] mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Button */}
          <Button
            type="submit"
            className="
              w-full 
              h-12 
              rounded-xl 
              text-base 
              font-semibold
              bg-[#10B981]
              hover:bg-[#0ea271]
              text-white
              transition-all
              duration-200
              shadow-md
              hover:shadow-lg
            "
          >
            Register
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="
              w-full
              h-12
              rounded-xl
              border
              border-gray-200
              bg-white
              hover:bg-gray-50
              transition-all
              duration-200
              flex
              items-center
              justify-center
              gap-3
              text-gray-700
              font-medium
            "
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?
            <Link
              href="/login"
              className="text-[#10B981] font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
