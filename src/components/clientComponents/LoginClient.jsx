"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

const LoginClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { email, password } = userData;

    // ✅ Inline password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    setPasswordError("");

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful");
    router.push(redirectPath);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });

    if (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue to your account
          </p>
        </div>

        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          {/* Email */}
          <TextField isRequired name="email" type="email" className="w-full">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <div className="min-h-[20px] mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be 8+ chars, 1 uppercase, 1 lowercase
            </Description>

            {/* Inline custom error */}
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

            <div className="min-h-[20px] mt-1">
              <FieldError className="text-red-500 text-sm" />
            </div>
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#10B981] text-white rounded-xl"
          >
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-3"
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?
            <Link href="/sign-up" className="text-[#10B981] font-semibold ml-1">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginClient;
