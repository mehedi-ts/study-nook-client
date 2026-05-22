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
    // Redirect to Login
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
      <div
        className="
          w-full 
          max-w-md 
          rounded-3xl 
          border 
          border-gray-200
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          p-6 
          sm:p-8
        "
      >
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
          <div className="w-full">
            <TextField isRequired name="name" type="text" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Name
              </Label>

              <Input placeholder="John Doe" className="w-full" />

              <div className="min-h-5 mt-1">
                <FieldError className="text-red-500 text-sm" />
              </div>
            </TextField>
          </div>

          {/* Email */}
          <div className="w-full">
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
          </div>

          {/* Image URL */}
          <div className="w-full">
            <TextField isRequired name="image" type="text" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </Label>

              <Input placeholder="Your profile image url" className="w-full" />

              <div className="min-h-[20px] mt-1">
                <FieldError className="text-red-500 text-sm" />
              </div>
            </TextField>
          </div>

          {/* Password */}
          <div className="w-full">
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

                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Password
              </Label>

              <Input placeholder="Enter your password" className="w-full" />

              <Description className="text-xs text-gray-500 mt-1">
                Must contain 8 characters
              </Description>

              <div className="min-h-[20px] mt-1">
                <FieldError className="text-red-500 text-sm" />
              </div>
            </TextField>
          </div>

          {/* Sign Up Button */}
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

          {/* Google Sign Up */}
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
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>

                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>

                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>

                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>

                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?
            <Link
              href="/login"
              className="
                text-[#10B981]
                font-semibold
                ml-1
                hover:underline
              "
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
