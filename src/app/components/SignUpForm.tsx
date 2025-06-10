"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signup } from "../auth/actions";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "validation":
        return "Please check your input. Make sure passwords match and meet requirements.";
      case "auth":
        return "Registration failed. This email might already be registered.";
      case "network":
        return "Connection error. Please try again.";
      case "email_exists":
        return "An account with this email already exists.";
      case "weak_password":
        return "Password is too weak. Please choose a stronger password.";
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Please create your account</p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form className="mt-8 space-y-6">
        <div className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope color="#9896B5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`appearance-none rounded-xl pl-10 relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error === "validation" || error === "email_exists"
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Email address"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock color="#9896B5" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={`appearance-none rounded-xl pl-10 relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error === "validation" || error === "weak_password"
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Password"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock color="#9896B5" />
            </div>
            <input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              required
              className={`appearance-none rounded-xl pl-10 relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error === "validation"
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Repeat password"
            />
          </div>
        </div>

        {/* Password requirements hint */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Password requirements:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>At least 6 characters long</li>
            <li>Contains uppercase and lowercase letters</li>
            <li>Contains at least one number</li>
          </ul>
        </div>

        <button
          formAction={signup}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
